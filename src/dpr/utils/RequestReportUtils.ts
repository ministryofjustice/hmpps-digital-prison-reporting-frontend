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
  const { reportId, variantId, dataProductDefinitionsPath } = req.body

  const definition = await reportingService.getDefinition(
    token,
    reportId,
    variantId,
    <string>dataProductDefinitionsPath,
  )
  const fields = definition ? definition.variant.specification.fields : []
  const queryData = filtersHelper.setQueryFromFilters(req, fields)

  const { executionId, tableId } = await reportingService.requestAsyncReport(token, reportId, variantId, {
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
  const { reportId, dashboardId, dataProductDefinitionsPath } = req.body
  const { executionId, tableId } = await dashboardService.requestAsyncDashboard(token, reportId, dashboardId, {
    dataProductDefinitionsPath,
  })

  return { executionData: { executionId, tableId } }
}

const renderDashboardRequestData = async (
  token: string,
  reportId: string,
  dashboardId: string,
  definitionPath: string,
  services: Services,
) => {
  const productDefinitions = await services.reportingService.getDefinitions(token, <string>definitionPath)
  const productDefinition = productDefinitions.find(
    (def: components['schemas']['ReportDefinitionSummary']) => def.id === reportId,
  )
  const reportName = productDefinition.name

  const dashboardDefinition: DashboardDefinition = await services.dashboardService.getDefinition(
    token,
    dashboardId,
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

const renderReportRequestData = async (
  token: string,
  reportId: string,
  variantId: string,
  definitionPath: string,
  services: Services,
) => {
  const definition = await services.reportingService.getDefinition(token, reportId, variantId, <string>definitionPath)

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

    if (type === ReportType.REPORT) {
      ;({ executionData, queryData } = await requestReport({
        req,
        token,
        reportingService: services.reportingService,
      }))
    }

    if (type === ReportType.DASHBOARD) {
      ;({ executionData } = await requestDashboard({
        req,
        token,
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

      const { reportId, variantId, dashboardId, type } = req.params
      const { dataProductDefinitionsPath: definitionPath } = req.query

      let name
      let reportName
      let description
      let template
      let definition
      let metrics

      if ((variantId && !type) || type === ReportType.REPORT) {
        ;({ name, reportName, description, definition } = await renderReportRequestData(
          token,
          reportId,
          variantId,
          <string>definitionPath,
          services,
        ))
      }

      if (dashboardId && type === ReportType.DASHBOARD) {
        ;({ name, reportName, description, metrics } = await renderDashboardRequestData(
          token,
          reportId,
          dashboardId,
          <string>definitionPath,
          services,
        ))
      }

      return {
        ...(definition && { definition }),
        reportData: {
          reportName,
          name,
          description,
          reportId,
          variantId,
          dashboardId,
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
