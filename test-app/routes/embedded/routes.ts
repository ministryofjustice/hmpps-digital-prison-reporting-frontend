/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'
import EmbeddedController from './controller'

// Routes
import SyncRoutes from './sync-report/routes'
import PlatformRoutes from './platform/routes'
import { Services } from 'src/dpr/types/Services'

export function Routes(services: Services) {
  const router = Router({ mergeParams: true })

  const controller = new EmbeddedController()
  router.get('/', controller.GET)

  router.use(`/platform/`, PlatformRoutes(services))
  router.use(`/sync`, SyncRoutes())

  return router
}

export const EmbeddedRoutes = ({ path, services }: { path: string, services: Services }) => {
  logger.info('Initialiasing routes: Embedded Routes')

  const router = Router({ mergeParams: true })
  router.use(path, Routes(services))

  return router
}
