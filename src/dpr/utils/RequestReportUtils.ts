/* eslint-disable no-param-reassign */
import { Request, Response } from 'express'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams, ExecutionData, RequestDataResult } from '../types/AsyncReportUtils'
import type ReportingService from '../services/reportingService'
import { ReportType, RequestFormData, RequestStatus } from '../types/UserReports'
import filtersHelper from '../components/async-filters/utils'
import { components } from '../types/api'
import { DashboardDefinition, DashboardMetricDefinition } from '../types/Dashboards'
import { Services } from '../types/Services'
import { SetQueryFromFiltersResult } from '../components/async-filters/types'
import type DashboardService from '../services/dashboardService'
import { removeDuplicates } from './reportStoreHelper'
import UserStoreItemBuilder from './UserStoreItemBuilder'

/**
 * Updates the store with the request details
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @param {SetQueryFromFiltersResult} querySummaryData
 * @param {string} executionId
 * @param {string} tableId
 * @return {*}  {Promise<string>}
 */
export const updateStore = async ({
  req,
  res,
  services,
  queryData,
  executionData,
}: {
  req: Request
  res: Response
  services: Services
  queryData?: SetQueryFromFiltersResult
  executionData: ExecutionData
}): Promise<string> => {
  const { search, variantId, type } = req.body
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

  removeDuplicates({ storeService: services.requestedReportService, userId, variantId, search })
  removeDuplicates({ storeService: services.recentlyViewedService, userId, variantId, search })

  const reportData: RequestFormData = req.body

  let requestedReportData
  switch (type) {
    case ReportType.REPORT:
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addFilters(queryData.filterData)
        .addSortData(queryData.sortData)
        .addRequestUrls()
        .addQuery(queryData)
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .build()
      break
    case ReportType.DASHBOARD:
      requestedReportData = new UserStoreItemBuilder(reportData)
        .addExecutionData(executionData)
        .addRequestUrls()
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .build()
      break
    default:
      break
  }

  await services.requestedReportService.addReport(userId, requestedReportData)

  return requestedReportData.url.polling.pathname
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
}): Promise<{ executionData: ExecutionData; queryData: SetQueryFromFiltersResult }> => {
  const { reportId, id, dataProductDefinitionsPath } = req.body

  const definition = await reportingService.getDefinition(token, reportId, id, <string>dataProductDefinitionsPath)
  const fields = definition ? definition.variant.specification.fields : []
  const queryData = filtersHelper.setQueryFromFilters(req, fields)

  const { executionId, tableId } = await reportingService.requestAsyncReport(token, reportId, id, {
    ...queryData.query,
    dataProductDefinitionsPath,
  })

  return {
    executionData: { executionId, tableId },
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
}: {
  req: Request
  token: string
  dashboardService: DashboardService
}) => {
  const { reportId, id, dataProductDefinitionsPath } = req.body
  const { executionId, tableId } = await dashboardService.requestAsyncDashboard(token, reportId, id, {
    dataProductDefinitionsPath,
  })

  return { executionData: { executionId, tableId } }
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
  const { name, description, metrics } = dashboardDefinition

  return {
    reportName,
    name,
    description,
    metrics: metrics as DashboardMetricDefinition[],
  }
}

const renderReportRequestData = async ({
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
  const definition = await services.reportingService.getDefinition(token, reportId, id, <string>definitionPath)

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
    let queryData: SetQueryFromFiltersResult

    const requestArgs = {
      req,
      token,
    }

    if (type === ReportType.REPORT) {
      ;({ executionData, queryData } = await requestReport({
        ...requestArgs,
        reportingService: services.reportingService,
      }))
    }

    if (type === ReportType.DASHBOARD) {
      ;({ executionData } = await requestDashboard({
        ...requestArgs,
        dashboardService: services.dashboardService,
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
      })
    }
    return redirect
  },

  cancelRequest: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, id, executionId, type } = req.body

    let response
    if (type === ReportType.REPORT) {
      response = await services.reportingService.cancelAsyncRequest(token, reportId, id, executionId)
    }
    if (type === ReportType.DASHBOARD) {
      response = await services.dashboardService.cancelAsyncRequest(token, reportId, id, executionId)
    }

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
      const token = res.locals.user?.token ? res.locals.user.token : 'token'
      const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'

      const { reportId, variantId, type, id } = req.params
      const { dataProductDefinitionsPath: definitionPath } = req.query

      let name
      let reportName
      let description
      let template
      let definition: components['schemas']['SingleVariantReportDefinition']
      let fields: components['schemas']['FieldDefinition'][]
      let metrics

      const renderArgs = {
        token,
        reportId,
        id: variantId || id, // NOTE: variantId is in old route - need to check for this also
        definitionPath: <string>definitionPath,
        services,
      }

      // NOTE: Old route will not have type, therefore a report. (See routes for more details)
      if (!type || type === ReportType.REPORT) {
        ;({ name, reportName, description, definition } = await renderReportRequestData(renderArgs))
        fields = definition?.variant?.specification?.fields
      }

      if (type === ReportType.DASHBOARD) {
        ;({ name, reportName, description, metrics } = await renderDashboardRequestData(renderArgs))
      }

      return {
        ...(fields && { fields }),
        reportData: {
          reportName,
          name,
          description,
          reportId,
          id: renderArgs.id,
          definitionPath: definitionPath as string,
          csrfToken,
          template,
          metrics,
          type: type ? (type as ReportType) : ReportType.REPORT,
        },
      }
    } catch (error) {
      next(error)
      return false
    }
  },

  handleError: (error: Dict<string>, req: Request) => {
    const { type } = req.body
    const filters = Object.keys(req.body)
      .filter((attr) => attr.includes('filters.'))
      .filter((attr) => !!req.body[attr])
      .map((attr) => {
        return { name: attr, value: req.body[attr] }
      })
    return {
      title: 'Request Failed',
      errorDescription: `Your ${type} has failed to generate.`,
      retry: true,
      error: error.data ? error.data : error,
      filters,
    }
  },
}
