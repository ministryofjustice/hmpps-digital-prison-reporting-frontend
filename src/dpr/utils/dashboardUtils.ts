import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import { ChartCardData } from '../types/Charts'
import ChartCardUtils from '../components/chart-card/utils'

export default {
  getDashboardData: async ({ req, res, services, next }: AsyncReportUtilsParams) => {
    try {
      const token = res.locals.user?.token ? res.locals.user.token : 'token'
      const { id } = req.params

      const mockDashboardDefinition = await services.dashboardService.getDefinition(token, id)
      const mockChartsData: ChartCardData[] = await Promise.all(
        mockDashboardDefinition.metrics.map(async (metric: { id: string }) => {
          return ChartCardUtils.getChartData({ id: metric.id, req, res, services })
        }),
      )

      return {
        title: 'Mock Dashboard',
        description:
          'This is a placeholder mocked dashaboad. All data is mocked. No APIs have been used to gather this data.',
        data: mockChartsData,
      }
    } catch (error) {
      next(error)
      return {}
    }
  },
}
