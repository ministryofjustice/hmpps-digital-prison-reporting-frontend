import { Router } from 'express'
import ChartsController from './controller'

// Routes
import BarChartRoutes from './bar/routes'
import LineChartRoutes from './line/routes'
import MatrixChartRoutes from './matrix/routes'
import PieChartRoutes from './pie/routes'
import BoxPlotChartRoutes from './boxplot/routes'

export default function routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new ChartsController()
  router.get('/', controller.GET)

  router.use('/pie', PieChartRoutes())
  router.use('/line', LineChartRoutes())
  router.use('/bar', BarChartRoutes())
  router.use('/boxplot', BoxPlotChartRoutes())
  router.use('/matrix', MatrixChartRoutes())

  return router
}
