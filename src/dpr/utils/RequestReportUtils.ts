/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import { AsyncReportUtilsParams, RequestDataResult } from '../types/AsyncReportUtils'
import { ExecutionData, ChildReportExecutionData } from '../types/ExecutionData'
import type ReportingService from '../services/reportingService'
import { ReportType, RequestFormData, RequestStatus } from '../types/UserReports'
import filtersHelper from '../components/_async/async-filters-form/utils'
import { components } from '../types/api'
import { DashboardDefinition } from '../components/_dashboards/dashboard/types'
import { Services } from '../types/Services'
import { SetQueryFromFiltersResult } from '../components/_async/async-filters-form/types'
import type DashboardService from '../services/dashboardService'
import { removeDuplicates } from './reportStoreHelper'
import UserStoreItemBuilder from './UserStoreItemBuilder'
import LocalsHelper from './localsHelper'
import FiltersUtils from '../components/_filters/utils'

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
        .addRequestUrls()
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

/**
 * Sends the request for the async report
 *
 * @param {{
 *   req: Request
 *   token: string
 *   reportingService: ReportingService
 * }} {
 *   req,
 *   token,
 *   reportingService,
 * }
 * @return {*}
 */
const requestReport = async ({
  req,
  token,
  reportingService,
}: {
  req: Request
  token: string
  reportingService: ReportingService
}): Promise<{
  executionData: ExecutionData
  childExecutionData: Array<ChildReportExecutionData>
  queryData: SetQueryFromFiltersResult
}> => {
  const { reportId, id, dataProductDefinitionsPath } = req.body

  const definition = await reportingService.getDefinition(token, reportId, id, <string>dataProductDefinitionsPath)
  const fields = definition ? definition.variant.specification.fields : []
  const queryData = filtersHelper.setQueryFromFilters(req, fields)

  const { executionId, tableId } = await reportingService.requestAsyncReport(token, reportId, id, {
    ...queryData.query,
    dataProductDefinitionsPath,
  })

  const childExecutionData = await requestChildReports(
    definition.variant.childVariants ?? [],
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

/**
 * Sends the request for the async dasboard
 *
 * @param {{
 *   req: Request
 *   token: string
 *   dashboardService: DashboardService
 * }} {
 *   req,
 *   token,
 *   dashboardService,
 * }
 * @return {*}
 */
const requestDashboard = async ({
  req,
  token,
  dashboardService,
  reportingService,
}: {
  req: Request
  token: string
  dashboardService: DashboardService
  reportingService: ReportingService
}): Promise<{ executionData: ExecutionData; childExecutionData: Array<ChildReportExecutionData> }> => {
  const { reportId, id, dataProductDefinitionsPath } = req.body
  const { executionId, tableId } = await dashboardService.requestAsyncDashboard(token, reportId, id, {
    dataProductDefinitionsPath,
  })

  // TODO: Plumb in child lists as and when relevant
  const childExecutionData = await requestChildReports(
    [],
    reportingService,
    token,
    reportId,
    null,
    dataProductDefinitionsPath,
  )

  return { executionData: { executionId, tableId }, childExecutionData }
}

const renderDashboardRequestData = async ({
  token,
  reportId,
  id,
  definitionPath,
  services,
}: {
  token: string
  reportId: string
  id: string
  definitionPath: string
  services: Services
}) => {
  const productDefinitions = await services.reportingService.getDefinitions(token, <string>definitionPath)
  const productDefinition = productDefinitions.find(
    (def: components['schemas']['ReportDefinitionSummary']) => def.id === reportId,
  )
  const reportName = productDefinition.name

  const dashboardDefinition: DashboardDefinition = await services.dashboardService.getDefinition(
    token,
    id,
    reportId,
    <string>definitionPath,
  )

  const { name, description, sections } = dashboardDefinition

  return {
    reportName,
    name,
    description,
    sections,
  }
}

const renderReportRequestData = async (definition: components['schemas']['SingleVariantReportDefinition']) => {
  return {
    definition,
    reportName: definition.name,
    name: definition.variant.name,
    description: definition.variant.description || definition.description,
    template: definition.variant.specification,
  }
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
    const { type } = req.body

    let executionData: ExecutionData
    let childExecutionData: Array<ChildReportExecutionData>
    let queryData: SetQueryFromFiltersResult

    const requestArgs = {
      req,
      token,
    }

    if (type === ReportType.REPORT) {
      ;({ executionData, queryData, childExecutionData } = await requestReport({
        ...requestArgs,
        reportingService: services.reportingService,
      }))
    }

    if (type === ReportType.DASHBOARD) {
      ;({ executionData, childExecutionData } = await requestDashboard({
        ...requestArgs,
        dashboardService: services.dashboardService,
        reportingService: services.reportingService,
      }))
    }

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
  renderRequestData: async ({
    req,
    res,
    services,
    next,
  }: AsyncReportUtilsParams): Promise<RequestDataResult | boolean> => {
    try {
      const { token, csrfToken } = LocalsHelper.getValues(res)

      const { reportId, type, id } = req.params
      const { dataProductDefinitionsPath: definitionPath } = req.query
      const { definition } = req.body

      let name
      let reportName
      let description
      let template
      let fields: components['schemas']['FieldDefinition'][]
      let sections
      let interactive
      let defaultInteractiveQueryString

      if (type === ReportType.REPORT) {
        ;({ name, reportName, description } = await renderReportRequestData(definition))
        fields = definition?.variant?.specification?.fields
        defaultInteractiveQueryString = fields
          ? FiltersUtils.setFilterQueryFromFilterDefinition(fields, true)
          : undefined
        interactive = definition?.variant?.interactive
      }

      if (type === ReportType.DASHBOARD) {
        ;({ name, reportName, description, sections } = await renderDashboardRequestData({
          token,
          reportId,
          id,
          definitionPath: <string>definitionPath,
          services,
        }))

        defaultInteractiveQueryString = definition.filterFields
          ? FiltersUtils.setFilterQueryFromFilterDefinition(definition.filterFields, true)
          : undefined
      }

      return {
        ...(fields && { fields }),
        interactive,
        reportData: {
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
        },
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
}
