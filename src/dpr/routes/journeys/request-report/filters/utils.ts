/* eslint-disable no-param-reassign */
import { Request, Response, NextFunction } from 'express'

// Utils
import FiltersFormUtils from '../../../../components/_async/async-filters-form/utils'
import LocalsHelper from '../../../../utils/localsHelper'
import FiltersUtils from '../../../../components/_filters/utils'
import { removeDuplicates } from '../../../../utils/reportStoreHelper'
import UserStoreItemBuilder from '../../../../utils/UserStoreItemBuilder'

// Types
import type ReportingService from '../../../../services/reportingService'
import { ReportType, RequestFormData, RequestStatus } from '../../../../types/UserReports'
import type { ExecutionData, ChildReportExecutionData } from '../../../../types/ExecutionData'
import type { AsyncReportUtilsParams, RequestDataResult, RequestReportData } from '../../../../types/AsyncReportUtils'
import type {
  RenderFiltersReturnValue,
  SetQueryFromFiltersResult,
} from '../../../../components/_async/async-filters-form/types'
import type { components } from '../../../../types/api'
import type { DashboardDefinition } from '../../../../components/_dashboards/dashboard/types'
import type { Services } from '../../../../types/Services'
import type DashboardService from '../../../../services/dashboardService'

/**
 * Updates the store with the request details
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {SetQueryFromFiltersResult} querySummaryData
 * @param {string} executionData
 * @return {*}  {Promise<string>}
 */
export const updateStore = async ({
  req,
  res,
  services,
  queryData,
  executionData,
  childExecutionData,
}: {
  req: Request
  res: Response
  services: Services
  queryData?: SetQueryFromFiltersResult
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
}): Promise<void> => {
  const { search, id, type } = req.body
  const { dprUser, definitionsPath, dpdPathFromQuery } = LocalsHelper.getValues(res)

  await removeDuplicates({ storeService: services.requestedReportService, userId: dprUser.id, id, search })
  await removeDuplicates({ storeService: services.recentlyViewedService, userId: dprUser.id, id, search })

  const reportData: RequestFormData = req.body

  let requestedReportData
  switch (type) {
    case ReportType.REPORT:
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addChildExecutionData(childExecutionData)
        .addFilters(queryData.filterData)
        .addSortData(queryData.sortData)
        .addDefinitionsPath(definitionsPath, dpdPathFromQuery)
        .addRequestUrls(req)
        .addQuery(queryData)
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .build()
      break
    case ReportType.DASHBOARD: {
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addChildExecutionData(childExecutionData)
        .addFilters(queryData.filterData)
        .addDefinitionsPath(definitionsPath, dpdPathFromQuery)
        .addRequestUrls(req)
        .addQuery(queryData)
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .addMetrics(JSON.parse(req.body.sections))
        .build()
      break
    }
    default:
      break
  }

  await services.requestedReportService.addReport(dprUser.id, requestedReportData)
}

async function requestChildReports(
  childVariants: Array<components['schemas']['ChildVariantDefinition']>,
  reportingService: ReportingService,
  token: string,
  reportId: string,
  queryData: SetQueryFromFiltersResult,
  dataProductDefinitionsPath: string,
): Promise<Array<ChildReportExecutionData>> {
  return Promise.all(
    childVariants.map((childVariant) =>
      reportingService
        .requestAsyncReport(token, reportId, childVariant.id, {
          ...queryData.query,
          dataProductDefinitionsPath,
        })
        .then((response) => {
          const { executionId, tableId } = response
          return { executionId, tableId, variantId: childVariant.id }
        }),
    ),
  )
}

const requestProduct = async ({
  req,
  res,
  token,
  dashboardService,
  reportingService,
}: {
  req: Request
  res: Response
  token: string
  dashboardService: DashboardService
  reportingService: ReportingService
}): Promise<{
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
  queryData: SetQueryFromFiltersResult
}> => {
  const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
  const { reportId, id, type } = req.body

  let fields
  let queryData
  let executionId
  let tableId
  let definition
  let childVariants: components['schemas']['ChildVariantDefinition'][] = []

  if (type === ReportType.REPORT) {
    definition = await reportingService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

    fields = definition ? definition.variant.specification.fields : []
    queryData = FiltersFormUtils.setQueryFromFilters(req, fields)
    ;({ executionId, tableId } = await reportingService.requestAsyncReport(token, reportId, id, {
      ...queryData.query,
      dataProductDefinitionsPath,
    }))
    childVariants = definition.variant.childVariants ?? []
  }

  if (type === ReportType.DASHBOARD) {
    definition = await dashboardService.getDefinition(token, reportId, id, dataProductDefinitionsPath)

    fields = definition ? definition.filterFields : []
    queryData = FiltersFormUtils.setQueryFromFilters(req, fields)
    ;({ executionId, tableId } = await dashboardService.requestAsyncDashboard(token, reportId, id, {
      ...queryData.query,
      dataProductDefinitionsPath,
    }))
  }

  const childExecutionData = await requestChildReports(
    childVariants,
    reportingService,
    token,
    reportId,
    queryData,
    dataProductDefinitionsPath,
  )

  return {
    executionData: { executionId, tableId },
    childExecutionData,
    queryData,
  }
}

const renderDashboardRequestData = async ({
  token,
  reportId,
  definitionPath,
  services,
  definition,
}: {
  token: string
  reportId: string
  definitionPath: string
  services: Services
  definition: DashboardDefinition
}) => {
  const productDefinitions = await services.reportingService.getDefinitions(token, definitionPath)
  const productDefinition = productDefinitions.find(
    (def: components['schemas']['ReportDefinitionSummary']) => def.id === reportId,
  )
  const reportName = productDefinition.name
  const { name, description, sections, filterFields: fields } = definition

  return {
    reportName,
    name,
    description,
    sections: sections || [],
    fields,
  }
}

const renderReportRequestData = async (definition: components['schemas']['SingleVariantReportDefinition']) => {
  return {
    definition,
    reportName: definition.name,
    name: definition.variant.name,
    description: definition.variant.description || definition.description,
    template: definition.variant.specification,
    fields: definition?.variant?.specification?.fields,
    interactive: definition?.variant?.interactive,
  }
}

const getDefintionByType = async (req: Request, res: Response, next: NextFunction, services: Services) => {
  const { token, definitionsPath } = LocalsHelper.getValues(res)
  const { reportId, id, variantId, type } = req.params

  const service = type === ReportType.REPORT ? services.reportingService : services.dashboardService
  const definition = await service.getDefinition(token, reportId, variantId || id, definitionsPath)

  return definition
}

const getFilterData = async (
  req: Request,
  res: Response,
  fields: components['schemas']['FieldDefinition'][],
  interactive: boolean,
  services: Services,
  userId: string,
) => {
  const { reportId, id } = req.params

  let filtersData = <RenderFiltersReturnValue>await FiltersFormUtils.renderFilters(fields, interactive)
  filtersData.filters = FiltersUtils.setUserContextDefaults(res, filtersData.filters)

  const defaultFilterValues = await services.defaultFilterValuesService.get(userId, reportId, id)
  if (defaultFilterValues) {
    filtersData = FiltersUtils.setFilterValuesFromSavedDefaults(filtersData, defaultFilterValues)
  }

  filtersData.filters = FiltersUtils.setFilterValuesFromRequest(filtersData.filters, req)

  return { filtersData, defaultFilterValues }
}

export default {
  /**
   * Sends the request for the async report
   *
   * @param {AsyncReportUtilsParams} { req, res, services }
   * @return {*}
   */
  request: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const { token } = LocalsHelper.getValues(res)
    const requestArgs = { req, res, token }

    const { executionData, queryData, childExecutionData } = await requestProduct({
      ...requestArgs,
      dashboardService: services.dashboardService,
      reportingService: services.reportingService,
    })

    if (executionData) {
      await updateStore({
        req,
        res,
        services,
        queryData,
        executionData,
        childExecutionData,
      })
    }

    return executionData.executionId
  },

  cancelRequest: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
    const { reportId, id, executionId, type } = req.params

    let service
    if (type === ReportType.REPORT) service = services.reportingService
    if (type === ReportType.DASHBOARD) service = services.dashboardService

    const response = await service.cancelAsyncRequest(token, reportId, id, executionId, definitionsPath)

    if (response && response.cancellationSucceeded) {
      await services.requestedReportService.updateStatus(executionId, dprUser.id, RequestStatus.ABORTED)
    }
  },

  /**
   * Returns the data required for rendering the async filters component
   *
   * @param {AsyncReportUtilsParams} { req, res, dataSources }
   * @return {*}
   */
  renderRequest: async ({ req, res, services, next }: AsyncReportUtilsParams): Promise<RequestDataResult | boolean> => {
    try {
      const {
        token,
        csrfToken,
        definitionsPath: definitionPath,
        dpdPathFromQuery,
        dprUser,
      } = LocalsHelper.getValues(res)
      const { reportId, type, id } = req.params
      const { definition } = res.locals
      const defaultsSaved = <string>req.query.defaultsSaved

      const definitionApiArgs = { token, reportId, definitionPath, services }

      let name
      let reportName
      let description
      let template
      let fields: components['schemas']['FieldDefinition'][]
      let sections
      let interactive
      let defaultInteractiveQueryString
      let filtersData
      let defaultFilterValues

      if (type === ReportType.REPORT) {
        ;({ name, reportName, description, fields, interactive } = await renderReportRequestData(definition))
      }

      if (type === ReportType.DASHBOARD) {
        ;({ name, reportName, description, sections, fields } = await renderDashboardRequestData({
          ...definitionApiArgs,
          definition,
        }))
      }

      if (fields) {
        ;({ filtersData, defaultFilterValues } = await getFilterData(
          req,
          res,
          fields,
          interactive,
          services,
          dprUser.id,
        ))
        defaultInteractiveQueryString = FiltersUtils.setFilterQueryFromFilterDefinition(fields, true)
      }

      const reportData: RequestReportData = {
        reportName,
        name,
        description,
        reportId,
        id,
        ...(dpdPathFromQuery && { definitionPath }),
        ...(defaultInteractiveQueryString?.length && { defaultInteractiveQueryString }),
        csrfToken,
        template,
        sections,
        hasDefaults: defaultFilterValues?.length,
        defaultsSaved,
        type: type as ReportType,
      }

      return {
        title: `Request ${type}`,
        filtersDescription: `Customise your ${type} using the filters below and submit your request.`,
        filtersData,
        reportData,
      }
    } catch (error) {
      next(error)
      return false
    }
  },

  getFiltersFromReqBody: (req: Request) => {
    return Object.keys(req.body)
      .filter((attr) => attr.includes('filters.'))
      .filter((attr) => !!req.body[attr])
      .map((attr) => {
        return { name: attr, value: req.body[attr] }
      })
  },

  getDefintionByType,
}
