/* eslint-disable no-param-reassign */
import { Router } from 'express'
import EmbeddedController from './controller'

// Routes
import PlatformRoutes from './platform/routes'
import { Services } from '../../../src/dpr/types/Services'

export function Routes(services: Services): Router {
  const router = Router({ mergeParams: true })

  const controller = new EmbeddedController()
  router.get('/', controller.GET)

  router.use(`/platform/`, PlatformRoutes(services))

  return router
}

export const EmbeddedRoutes = ({ path, services }: { path: string; services: Services }): Router => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes(services))

  return router
}
