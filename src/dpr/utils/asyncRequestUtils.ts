/* eslint-disable no-param-reassign */
import { Request } from 'express'
import Dict = NodeJS.Dict
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import type ReportingService from '../services/reportingService'
import { ReportType } from '../types/UserReports'
import filtersHelper from '../components/async-filters/utils'
import { components } from '../types/api'
import { DashboardDefinition, DashboardMetricDefinition } from '../types/Dashboards'
import { Services } from '../types/Services'
import DashboardUtils from './dashboardUtils'
import MetricService from '../services/metricsService'
import { getDpdPathSuffix } from './urlHelper'

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
}) => {
  const { reportId, variantId, dataProductDefinitionsPath } = req.body
  const definition = await reportingService.getDefinition(
    token,
    reportId,
    variantId,
    <string>dataProductDefinitionsPath,
  )

  const fields = definition ? definition.variant.specification.fields : []
  const querySummaryData = filtersHelper.setQueryFromFilters(req, fields)

  const { executionId, tableId } = await reportingService.requestAsyncReport(token, reportId, variantId, {
    ...querySummaryData.query,
    dataProductDefinitionsPath,
  })

  return {
    executionData: [{ executionId, tableId }],
    querySummaryData,
  }
}

const setPollingUrl = ({
  req,
  executionData,
}: {
  req: Request
  executionData: { executionId: string; tableId: string }[]
}) => {
  const { pathname, dataProductDefinitionsPath, origin } = req.body
  let executionId = ''
  executionData.forEach((item: { executionId: string; tableId: string }) => {
    executionId = `${executionId}/${item.executionId}`
  })
  return {
    fullUrl: `${origin}${pathname}${executionId}${getDpdPathSuffix(dataProductDefinitionsPath)}`,
    pathname: `${pathname}${executionId}${getDpdPathSuffix(dataProductDefinitionsPath)}`,
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
  metricsService,
}: {
  req: Request
  token: string
  metricsService: MetricService
}) => {
  const metricsExecutionResponses = await DashboardUtils.requestDashboardDataAsync({ req, token, metricsService })
  return {
    executionData: metricsExecutionResponses,
  }
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

export interface RequestDataResult {
  definition?: components['schemas']['SingleVariantReportDefinition']
  reportData: {
    reportName: string
    name: string
    description: string
    reportId: string
    variantId?: string
    dashboardId?: string
    definitionPath: string
    csrfToken: string
    template?: string
    metrics?: DashboardMetricDefinition[]
    type: ReportType
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

    let executionData: { executionId: string; tableId: string }[]
    let querySummaryData

    if (type === ReportType.REPORT) {
      ;({ executionData, querySummaryData } = await requestReport({
        req,
        token,
        reportingService: services.reportingService,
      }))
    }

    if (type === ReportType.DASHBOARD) {
      ;({ executionData } = await requestDashboard({
        req,
        token,
        metricsService: services.metricService,
      }))
    }

    const pollingUrlData = setPollingUrl({ req, executionData })
    console.log({ pollingUrlData })

    let redirect = ''
    if (executionData.length) {
      redirect = await services.asyncReportsStore.updateStore({
        req,
        res,
        services,
        querySummaryData,
        executionData,
        pollingUrlData,
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
  }: // TODO: fix interfaces here
  AsyncReportUtilsParams): Promise<RequestDataResult | boolean> => {
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
