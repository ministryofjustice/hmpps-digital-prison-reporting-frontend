import parseUrl from 'parseurl'
import { Url } from 'url'
import type { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import type { ChartCardData } from '../../../types/Charts'
import type { DashboardDefinition } from '../../../types/Dashboards'
import type { MetricsDataResponse } from '../../../types/Metrics'
import type { RequestedReport } from '../../../types/UserReports'
import { ReportType } from '../../../types/UserReports'
import type { components } from '../../../types/api'

import ChartCardUtils from '../../_charts/chart-card/utils'
import DefinitionUtils from '../../../utils/definitionUtils'
import UserReportsUtils from '../../user-reports/utils'
import FilterUtils from '../../_filters/utils'
import ScorecardsUtils from '../scorecard/utils'
import ReportActionsUtils from '../../_reports/report-actions/utils'
import ReportQuery from '../../../types/ReportQuery'
import LocalsHelper from '../../../utils/localsHelper'
import { Services } from '../../../types/Services'
import { ScorecardGroup } from '../scorecard/types'

const setDashboardActions = (
  dashboardDefinition: DashboardDefinition,
  reportDefinition: components['schemas']['ReportDefinitionSummary'],
  requestData: RequestedReport,
) => {
  const reportName = reportDefinition.name
  const { name } = dashboardDefinition
  const actionsUrl = requestData.url.request.fullUrl
  const { executionId } = requestData

  return ReportActionsUtils.getActions({
    share: {
      reportName,
      name,
      url: actionsUrl,
    },
    refresh: {
      url: actionsUrl,
      executionId,
    },
    copy: {
      url: actionsUrl,
    },
  })
}

const getDefinitionData = async ({ req, res, services, next }: AsyncReportUtilsParams) => {
  const { token } = LocalsHelper.getValues(res)
  const { reportId, id } = req.params
  const { dataProductDefinitionsPath } = req.query

  // Dashboard Definition,
  const dashboardDefinition: DashboardDefinition = await services.dashboardService.getDefinition(
    token,
    id,
    reportId,
    dataProductDefinitionsPath,
  )

  // Report summary data
  const reportDefinition = await DefinitionUtils.getReportSummary(
    reportId,
    services.reportingService,
    token,
    <string>dataProductDefinitionsPath,
  )

  // Get the filters
  const filters = await FilterUtils.getFilters({
    fields: dashboardDefinition.filterFields || [],
    req,
    interactive: true,
  })

  // Create the query
  const query = new ReportQuery({
    fields: dashboardDefinition.filterFields || [],
    queryParams: req.query,
    definitionsPath: <string>dataProductDefinitionsPath,
  }).toRecordWithFilterPrefix(true)

  return {
    query,
    filters,
    dashboardDefinition,
    reportDefinition,
  }
}

const getParts = (dashboardDefinition: DashboardDefinition, dashboardData: MetricsDataResponse[][]) => {
  // Scorecards
  const scorecards: ScorecardGroup[] = ScorecardsUtils.createScorecards(
    dashboardDefinition.scorecards || [],
    dashboardData,
  )

  // Charts
  const charts: ChartCardData[] = ChartCardUtils.getChartData({
    metricsDefinition: dashboardDefinition.metrics,
    dashboardData,
  })

  return {
    scorecards,
    charts,
  }
}

const updateStore = async (services: Services, tableId: string, userId: string, charts: ChartCardData[], url: Url) => {
  const dashboardRequestData: RequestedReport = await services.requestedReportService.getReportByTableId(
    tableId,
    userId,
  )

  // Add to recently viewed
  if (charts && charts.length && dashboardRequestData) {
    UserReportsUtils.updateLastViewed({
      services,
      reportStateData: dashboardRequestData,
      userId,
      search: url.search,
      href: url.href,
    })
  }

  return dashboardRequestData
}

export default {
  renderAsyncDashboard: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    const { token, csrfToken, userId } = LocalsHelper.getValues(res)
    const { reportId, id, tableId } = req.params
    const url = parseUrl(req)

    // Get the definition Data
    const { query, filters, reportDefinition, dashboardDefinition } = await getDefinitionData({
      req,
      res,
      services,
    })

    // Get the results data
    const dashboardData: MetricsDataResponse[][] = await services.dashboardService.getAsyncDashboard(
      token,
      id,
      reportId,
      tableId,
      query,
    )

    // Get the dashboard parts
    const { scorecards, charts } = getParts(dashboardDefinition, dashboardData)

    // Update the store
    const dashboardRequestData = await updateStore(services, tableId, userId, charts, url)

    return {
      dashboardData: {
        token,
        id,
        reportId,
        name: dashboardDefinition.name,
        description: dashboardDefinition.description,
        reportName: reportDefinition.name,
        bookmarked: await services.bookmarkService.isBookmarked(id, userId),
        csrfToken,
        metrics: charts,
        filters,
        scorecards,
        type: ReportType.DASHBOARD,
        actions: setDashboardActions(dashboardDefinition, reportDefinition, dashboardRequestData),
      },
    }
  },
}
