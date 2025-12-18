/* eslint-disable no-param-reassign */
import { Router } from 'express'
import setUpNestedRoute from '../../../src/dpr/middleware/setUpNestedRoute'
import EmbeddedController from './controller'

// Routes
import SyncRoutes from './sync-report/routes'
import PlatformRoutes from './platform/routes'
import { Services } from '../../../src/dpr/types/Services'

export function Routes(services: Services) {
  const router = Router({ mergeParams: true })

  const controller = new EmbeddedController()
  router.get('/', controller.GET)

  router.use(`/platform/`, setUpNestedRoute(), PlatformRoutes(services))
  router.use(`/sync`, SyncRoutes())

  return router
}

export const EmbeddedRoutes = ({ path, services }: { path: string; services: Services }) => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes(services))

  return router
}
