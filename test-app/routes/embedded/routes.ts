/* eslint-disable no-param-reassign */
import { Router } from 'express'
import EmbeddedController from './controller'

// Routes
import PlatformRoutes from './platform/routes'
import { Services } from '../../../src/dpr/types/Services'
import setUpNestedRoute from '../../../src/dpr/middleware/setUpNestedRoute'

export function Routes(services: Services): Router {
  const router = Router({ mergeParams: true })

  const controller = new EmbeddedController()
  router.get('/', controller.GET)

  router.use(`/platform/`, setUpNestedRoute(), PlatformRoutes(services))

  return router
}

export const EmbeddedRoutes = ({ path, services }: { path: string; services: Services }): Router => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes(services))

  return router
}
