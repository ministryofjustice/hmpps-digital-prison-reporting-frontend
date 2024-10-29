import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { ChartCardData } from '../../types/Charts'
import ChartCardUtils from '../chart-card/utils'
import MetricsUtils from '../../utils/metricsUtils'
import { DashboardDefinition, DashboardMetricDefinition } from '../../types/Dashboards'
import { MetricsDataResponse } from '../../types/Metrics'
import { RequestedReport } from '../../types/UserReports'

export default {
  renderAsyncDashboard: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    const { reportId, id, tableId } = req.params
    const { dataProductDefinitionsPath } = req.query

    // Dashboard Definition,
    const definition: DashboardDefinition = await services.dashboardService.getDefinition(
      token,
      id,
      reportId,
      dataProductDefinitionsPath,
    )

    // The metrics Data
    const dashboardMetricsData: MetricsDataResponse[] = await services.dashboardService.getAsyncDashboard(
      token,
      reportId,
      id,
      tableId,
      {
        dataProductDefinitionsPath,
      },
    )

    // Match metric data with its defintion
    const dashboardMetricsDataWithDefinitions = await Promise.all(
      dashboardMetricsData.map(async (metricData: MetricsDataResponse) => {
        const metricDefinition = await services.metricService.getDefinition(
          token,
          metricData.id,
          reportId,
          <string>dataProductDefinitionsPath,
        )

        return {
          definition: metricDefinition,
          metric: metricData,
        }
      }),
    )

    // Create Visualisation data with metric data and definition
    const metrics: ChartCardData[] = dashboardMetricsDataWithDefinitions.map((metric) => {
      return ChartCardUtils.getChartData(metric)
    })

    // get the dashboard request data
    const dashboardRequestData: RequestedReport = await services.requestedReportService.getReportByTableId(
      tableId,
      userId,
    )

    // Add to recently viewed
    if (metrics && metrics.length && dashboardRequestData) {
      await services.requestedReportService.updateLastViewed(dashboardRequestData.executionId, userId)
      await services.recentlyViewedService.setRecentlyViewed(dashboardRequestData, userId)
    }

    return {
      title: definition.name,
      description: definition.description,
      metrics,
    }
  },

  requestDashboardDataSync: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    const metrics = JSON.parse(req.body.metrics)
    const { title, description } = req.body
    const metricsData = await Promise.all(
      metrics.map(async (metric: DashboardMetricDefinition) => {
        return MetricsUtils.getMetricData({
          id: metric.id,
          req,
          res,
          services,
          next,
        })
      }),
    )

    const chartsData: ChartCardData[] = metricsData.map((metric) => {
      return ChartCardUtils.getChartData(metric)
    })

    return {
      title,
      description,
      metrics: chartsData,
    }
  },

  getDashboardDataSync: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const { dashboardId: id, dpdId } = req.params
    const { dataProductDefinitionsPath } = req.query

    const definition: DashboardDefinition = await services.dashboardService.getDefinition(
      token,
      id,
      dpdId,
      dataProductDefinitionsPath,
    )

    return {
      definition,
      id,
      dpdId,
      dataProductDefinitionsPath,
      csrfToken,
    }
  },
}
