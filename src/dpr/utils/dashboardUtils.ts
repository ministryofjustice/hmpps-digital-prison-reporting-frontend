import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { ChartCardData } from '../types/Charts'
import ChartCardUtils from '../components/chart-card/utils'
import MetricsUtils from './metricsUtils'
import { DashboardDefinition, DashboardMetricDefinition } from '../types/Dashboards'

export default {
  getDashboardData: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    try {
      const token = res.locals.user?.token ? res.locals.user.token : 'token'
      const { id, dataProductDefinitionsPath } = req.params

      // Get dashboard Definition
      const definition: DashboardDefinition = await services.dashboardService.getDefinition(
        token,
        id,
        dataProductDefinitionsPath,
      )

      // Get the metrics definitions and metrics data
      const metricsData = await Promise.all(
        definition.metrics.map(async (metric: DashboardMetricDefinition) => {
          const { visualisationType: type } = metric
          return MetricsUtils.getMetricData({
            id: metric.id,
            type,
            req,
            res,
            services,
            next,
          })
        }),
      )

      // Convert metrics data in to chart data
      const chartsData: ChartCardData[] = metricsData.map((m) => {
        return ChartCardUtils.getChartData(m)
      })

      return {
        title: definition.name,
        description: definition.description,
        data: chartsData,
      }
    } catch (error) {
      next(error)
      return {}
    }
  },
}
