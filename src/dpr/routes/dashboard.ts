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
      // TODO: get Dashboard Data from API
      const mockDashboardData = ['multi_chart-0', 'multi_chart-2', 'line-chart-2']

      const mockChartsData: ChartCardData[] = mockDashboardData.map((metricId) => {
        // TODO: get metric data from an API
        const MetricDataFromTheAPI = mockChartsApiData.find((chart) => chart.id === metricId)

        // TODO Munge Data to conform to charts interface. munge, munge, munge
        const mockChartData = ChartCardUtils.getChartData(MetricDataFromTheAPI)

        return mockChartData
      })

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
