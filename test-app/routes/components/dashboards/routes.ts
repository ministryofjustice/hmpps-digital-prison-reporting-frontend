/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import ScorecardRoutes from './scorecards/routes'
import ChartsRoutes from './charts/routes'
import ListsRoutes from './list/routes'

import DashboardController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })

  const controller = new DashboardController()
  router.get('/', controller.GET)

  router.use('/scorecards', ScorecardRoutes())
  router.use('/charts', ChartsRoutes())
  router.use('/list', ListsRoutes())

  return router
}
