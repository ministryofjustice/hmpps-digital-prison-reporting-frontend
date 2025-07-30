import { Router } from 'express'
import ChartsController from './controller'

// Routes
import BarChartRoutes from './bar/routes'
import LineChartRoutes from './line/routes'
import PieChartRoutes from './pie/routes'
import ListChartRoutes from './list/routes'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new ChartsController()
  router.get('/', controller.GET)

  router.use('/pie', PieChartRoutes())
  router.use('/line', LineChartRoutes())
  router.use('/bar', BarChartRoutes())
  router.use('/list', ListChartRoutes())

  return router
}
