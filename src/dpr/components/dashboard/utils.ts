import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { ChartCardData } from '../../types/Charts'
import ChartCardUtils from '../chart-card/utils'
import DefinitionUtils from '../../utils/definitionUtils'
import { DashboardDefinition } from '../../types/Dashboards'
import { MetricsDataResponse } from '../../types/Metrics'
import { ReportType, RequestedReport } from '../../types/UserReports'
import UserReportsUtils from '../user-reports/utils'
import establishmentFilter from './mockDashboardFilters'

import ReportActionsUtils from '../report-actions/utils'
import { components } from '../../types/api'
import { FilterOption } from '../filter-input/types'

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
    const params = [token, id, reportId]

    // Dashboard Definition,
    const dashboardDefinition: DashboardDefinition = await services.dashboardService.getDefinition(
      ...params,
      dataProductDefinitionsPath,
    )

    // TODO: Interactive Filters: set query properly
    const mockQuery = { dataProductDefinitionsPath, establishmentId: req.query['filters.establishmentId'] }

    // The metrics Data
    const dashboardMetricsData: MetricsDataResponse[] = await services.dashboardService.getAsyncDashboard(
      ...params,
      tableId,
      mockQuery,
    )

    // Create the visualisation data
    const metrics: ChartCardData[] = ChartCardUtils.getChartData({ dashboardDefinition, dashboardMetricsData })

    // get the dashboard request data
    const dashboardRequestData: RequestedReport = await services.requestedReportService.getReportByTableId(
      tableId,
      userId,
    )

    // TODO: get filters from definition once the structure is known
    const filters: FilterOption[] = establishmentFilter as FilterOption[]

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
        ...params,
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
