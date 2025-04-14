/* eslint-disable no-param-reassign */
import { Request, Response, NextFunction } from 'express'

// Utils
import FiltersFormUtils from '../async-filters-form/utils'
import LocalsHelper from '../../../utils/localsHelper'
import FiltersUtils from '../../_filters/utils'
import { removeDuplicates } from '../../../utils/reportStoreHelper'
import UserStoreItemBuilder from '../../../utils/UserStoreItemBuilder'

// Types
import type ReportingService from '../../../services/reportingService'
import { ReportType, RequestFormData, RequestStatus } from '../../../types/UserReports'
import type { ExecutionData, ChildReportExecutionData } from '../../../types/ExecutionData'
import type { AsyncReportUtilsParams, RequestDataResult, RequestReportData } from '../../../types/AsyncReportUtils'
import type { RenderFiltersReturnValue, SetQueryFromFiltersResult } from '../async-filters-form/types'
import type { components } from '../../../types/api'
import type { DashboardDefinition } from '../../_dashboards/dashboard/types'
import type { Services } from '../../../types/Services'
import type DashboardService from '../../../services/dashboardService'

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
}): Promise<string> => {
  const { search, id, type } = req.body
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

  await removeDuplicates({ storeService: services.requestedReportService, userId, id, search })
  await removeDuplicates({ storeService: services.recentlyViewedService, userId, id, search })

  const reportData: RequestFormData = req.body

  let requestedReportData
  switch (type) {
    case ReportType.REPORT:
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addChildExecutionData(childExecutionData)
        .addFilters(queryData.filterData)
        .addSortData(queryData.sortData)
        .addRequestUrls()
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
        .addRequestUrls()
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

  await services.requestedReportService.addReport(userId, requestedReportData)

  return requestedReportData.url.polling.pathname
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
  token,
  dashboardService,
  reportingService,
}: {
  req: Request
  token: string
  dashboardService: DashboardService
  reportingService: ReportingService
}): Promise<{
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
  queryData: SetQueryFromFiltersResult
}> => {
  const { reportId, id, dataProductDefinitionsPath, type } = req.body

  let fields
  let queryData
  let executionId
  let tableId
  let definition
  let childVariants: components['schemas']['ChildVariantDefinition'][] = []

  if (type === ReportType.REPORT) {
    definition = await reportingService.getDefinition(token, reportId, id, <string>dataProductDefinitionsPath)

    fields = definition ? definition.variant.specification.fields : []
    queryData = FiltersFormUtils.setQueryFromFilters(req, fields)
    ;({ executionId, tableId } = await reportingService.requestAsyncReport(token, reportId, id, {
      ...queryData.query,
      dataProductDefinitionsPath,
    }))
    childVariants = definition.variant.childVariants ?? []
  }

  if (type === ReportType.DASHBOARD) {
    definition = await dashboardService.getDefinition(token, id, reportId, <string>dataProductDefinitionsPath)

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
  const productDefinitions = await services.reportingService.getDefinitions(token, <string>definitionPath)
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
  const { token } = LocalsHelper.getValues(res)
  const { reportId, id, variantId, type } = req.params
  const { dataProductDefinitionsPath } = req.query

  let definition
  if (type === ReportType.REPORT) {
    definition = await services.reportingService.getDefinition(
      token,
      reportId,
      variantId || id,
      dataProductDefinitionsPath,
    )
  }

  if (type === ReportType.DASHBOARD) {
    definition = await services.dashboardService.getDefinition(
      token,
      variantId || id,
      reportId,
      dataProductDefinitionsPath,
    )
  }

  return definition
}

export default {
  /**
   * Sends the request for the async report
   *
   * @param {AsyncReportUtilsParams} { req, res, services }
   * @return {*}
   */
  request: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const requestArgs = { req, token }
    const { executionData, queryData, childExecutionData } = await requestProduct({
      ...requestArgs,
      dashboardService: services.dashboardService,
      reportingService: services.reportingService,
    })

    let redirect = ''
    if (executionData) {
      redirect = await updateStore({
        req,
        res,
        services,
        queryData,
        executionData,
        childExecutionData,
      })
    }

    return redirect
  },

  cancelRequest: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, executionId, type } = req.body

    let service
    if (type === ReportType.REPORT) service = services.reportingService
    if (type === ReportType.DASHBOARD) service = services.dashboardService

    const response = await service.cancelAsyncRequest(token, reportId, id, executionId)

    if (response && response.cancellationSucceeded) {
      await services.requestedReportService.updateStatus(executionId, userId, RequestStatus.ABORTED)
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
      const { token, csrfToken } = LocalsHelper.getValues(res)

      const { reportId, type, id } = req.params
      const { dataProductDefinitionsPath: definitionPath } = req.query
      const { definition } = req.body
      const definitionApiArgs = { token, reportId, definitionPath: <string>definitionPath, services }

      let name
      let reportName
      let description
      let template
      let fields: components['schemas']['FieldDefinition'][]
      let sections
      let interactive
      let defaultInteractiveQueryString
      let filtersData

      if (type === ReportType.REPORT) {
        ;({ name, reportName, description, fields, interactive } = await renderReportRequestData(definition))
      }

      if (type === ReportType.DASHBOARD) {
        ;({ name, reportName, description, sections, fields } = await renderDashboardRequestData({
          ...definitionApiArgs,
          definition,
        }))

        console.log({ name, reportName, description, sections, fields })
      }

      if (fields) {
        filtersData = <RenderFiltersReturnValue>await FiltersFormUtils.renderFilters(fields, interactive)
        defaultInteractiveQueryString = FiltersUtils.setFilterQueryFromFilterDefinition(fields, true)
      }

      const reportData: RequestReportData = {
        reportName,
        name,
        description,
        reportId,
        id,
        definitionPath: definitionPath as string,
        ...(defaultInteractiveQueryString?.length && { defaultInteractiveQueryString }),
        csrfToken,
        template,
        sections,
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
