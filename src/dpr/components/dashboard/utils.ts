import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { ChartCardData } from '../../types/Charts'
import ChartCardUtils from '../chart-card/utils'
import MetricsUtils from '../../utils/metricsUtils'
import { DashboardDefinition, DashboardMetricDefinition } from '../../types/Dashboards'

export default {
  requestDashboardDataSync: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    try {
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
    } catch (error) {
      next(error)
      return {}
    }
  },

  getDashboardDataSync: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
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
