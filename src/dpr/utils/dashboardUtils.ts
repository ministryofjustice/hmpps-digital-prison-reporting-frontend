import { Request } from 'express'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { ChartCardData } from '../types/Charts'
import ChartCardUtils from '../components/chart-card/utils'
import MetricsUtils from './metricsUtils'
import { DashboardDefinition, DashboardMetricDefinition } from '../types/Dashboards'
import MetricService from '../services/metricsService'

export default {
  requestDashboardData: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
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
        data: chartsData,
      }
    } catch (error) {
      next(error)
      return {}
    }
  },

  requestDashboardMetricsDataAsync: async ({
    req,
    token,
    metricsService,
  }: {
    req: Request
    token: string
    metricsService: MetricService
  }) => {
    const { reportId } = req.body
    const metrics = JSON.parse(req.body.metrics)

    return Promise.all(
      metrics.map(async (metric: DashboardMetricDefinition) => {
        return metricsService.getMetricDataAsync(token, metric.id, reportId)
      }),
    )
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
