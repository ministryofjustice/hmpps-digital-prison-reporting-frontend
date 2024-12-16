/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams, ExecutionData, RequestDataResult } from '../types/AsyncReportUtils'
import type ReportingService from '../services/reportingService'
import { ReportType, RequestFormData, RequestStatus } from '../types/UserReports'
import filtersHelper from '../components/_async/async-filters-form/utils'
import { components } from '../types/api'
import { DashboardDefinition } from '../types/Dashboards'
import { Services } from '../types/Services'
import { SetQueryFromFiltersResult } from '../components/_async/async-filters-form/types'
import type DashboardService from '../services/dashboardService'
import { removeDuplicates } from './reportStoreHelper'
import UserStoreItemBuilder from './UserStoreItemBuilder'
import LocalsHelper from './localsHelper'

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
        .addRequestUrls()
        .addStatus(RequestStatus.SUBMITTED)
        .addTimestamp()
        .addMetrics(JSON.parse(req.body.metrics))
        .build()
      break
    }
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
    metrics,
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
      let metrics
      let interactive

      if (type === ReportType.REPORT) {
        ;({ name, reportName, description } = await renderReportRequestData(definition))
        fields = definition?.variant?.specification?.fields
        // TODO: fix type once interactive flag in place
        interactive = (<components['schemas']['VariantDefinition'] & { interactive?: boolean }>definition?.variant)
          ?.interactive
      }

      if (type === ReportType.DASHBOARD) {
        ;({ name, reportName, description, metrics } = await renderDashboardRequestData({
          token,
          reportId,
          id,
          definitionPath: <string>definitionPath,
          services,
        }))
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
          csrfToken,
          template,
          metrics,
          type: type as ReportType,
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
