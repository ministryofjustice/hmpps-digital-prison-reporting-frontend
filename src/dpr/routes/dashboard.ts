import type { RequestHandler, Router } from 'express'
import { ChartCardData } from '../types/Charts'
import ChartCardUtils from '../components/chart-card/utils'

export default function routes(
  {
    router,
    layoutPath,
    templatePath = 'dpr/views/',
  }: {
    router: Router
    layoutPath: string
    templatePath?: string
  },
  mockChartsApiData: ChartCardData[],
) {
  const getDashboardDataHandler: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params
      // TODO: get Dashboard Data from API
      const mockDashboardData = await DashboardService.getDashboardData(id)

      const mockMetricsService = {
        getMetricData: async (metricId: string) => {
          return Promise.resolve(mockChartsApiData.find((chart) => chart.id === metricId))
        },
      }

      const mockChartsData: ChartCardData[] = await Promise.all(
        mockDashboardData.map(async (metricId) => {
          // TODO: implementaton to get & transform the metrics data
          return ChartCardUtils.getChartData(metricId, mockMetricsService)
        }),
      )

      res.render(`${templatePath}dashboard`, {
        title: 'Mock Dashboard',
        charts: mockChartsData,
        layoutPath,
      })
    } catch (error) {
      next()
    }
  }

  router.get('/dashboard/:id', getDashboardDataHandler)
}

// Mock Dashboard service
const DashboardService = {
  getDashboardData: async (id: string) => {
    return Promise.resolve(['multi_chart-0', 'multi_chart-2', 'line-chart-2'])
  },
}
