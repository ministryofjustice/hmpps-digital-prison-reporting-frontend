/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import HandlerRoutes from './handler/routes'
import MethodRoutes from './method/routes'
import ValidationRoutes from './validation/routes'
import FailRoutes from './fail/routes'

import SyncReportController from './controller'

export default function routes() {
  const router = Router({ mergeParams: true })

  const controller = new SyncReportController()

  router.get('/', controller.GET)

  router.use(`/handler`, HandlerRoutes())
  router.use(`/method`, MethodRoutes())
  router.use(`/validation`, ValidationRoutes())
  router.use(`/fail`, FailRoutes())

  return router
}
