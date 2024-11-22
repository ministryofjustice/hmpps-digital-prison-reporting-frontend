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
import ReportActionsUtils from '../../_reports/report-actions/utils'
import ReportQuery from '../../../types/ReportQuery'

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

export default {
  renderAsyncDashboard: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'

    const { reportId, id, tableId } = req.params
    const { dataProductDefinitionsPath } = req.query

    // Dashboard Definition,
    const dashboardDefinition: DashboardDefinition = await services.dashboardService.getDefinition(
      token,
      id,
      reportId,
      dataProductDefinitionsPath,
    )

    const reportQuery = new ReportQuery({
      fields: dashboardDefinition.filterFields,
      queryParams: req.query,
      definitionsPath: <string>dataProductDefinitionsPath,
    })

    // The metrics Data
    const dashboardMetricsData: MetricsDataResponse[] = await services.dashboardService.getAsyncDashboard(
      token,
      id,
      reportId,
      tableId,
      reportQuery,
    )

    // Create the visualisation data
    const metrics: ChartCardData[] = ChartCardUtils.getChartData({ dashboardDefinition, dashboardMetricsData })

    // get the dashboard request data
    const dashboardRequestData: RequestedReport = await services.requestedReportService.getReportByTableId(
      tableId,
      userId,
    )

    // Filters
    const filters = await FilterUtils.getFilters({
      fields: dashboardDefinition.filterFields,
      req,
      interactive: true,
    })

    // Report summary data
    const reportDefinition = await DefinitionUtils.getReportSummary(
      reportId,
      services.reportingService,
      token,
      <string>dataProductDefinitionsPath,
    )

    // Add to recently viewed
    if (metrics && metrics.length && dashboardRequestData) {
      UserReportsUtils.updateLastViewed({ services, reportStateData: dashboardRequestData, userId })
    }

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
        metrics,
        filters,
        type: ReportType.DASHBOARD,
        actions: setDashboardActions(dashboardDefinition, reportDefinition, dashboardRequestData),
      },
    }
  },
}
