import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { ChartCardData } from '../types/Charts'
import ChartCardUtils from '../components/chart-card/utils'
import MetricsUtils from './metricsUtils'
import { DashboardDefinition, DashboardMetricDefinition } from '../types/Dashboards'

export default {
  requestDashboardData: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    try {
      const metrics = JSON.parse(req.body.metrics)
      const { title, description } = req.body
      const metricsData = await Promise.all(
        metrics.map(async (metric: DashboardMetricDefinition) => {
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
      const chartsData: ChartCardData[] = metricsData.map((metric) => {
        return ChartCardUtils.getChartData(metric)
      })

      return {
        title,
        description,
        data: chartsData,
      }
    } catch (error) {
      next(error)
      return {}
    }
  },

  getDashboardData: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    try {
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
    } catch (error) {
      next(error)
      return {}
    }
  },
}
