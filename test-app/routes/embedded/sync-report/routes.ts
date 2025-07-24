/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import DataRoutes from './data/routes'
import HandlerRoutes from './handler/routes'
import MethodRoutes from './method/routes'

export default function routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use(`/data`, DataRoutes({ layoutPath }))
  router.use(`/handler`, HandlerRoutes({ layoutPath }))
  router.use(`/method`, MethodRoutes({ layoutPath }))

  return router
}
