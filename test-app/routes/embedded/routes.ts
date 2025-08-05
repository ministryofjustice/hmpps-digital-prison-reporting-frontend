/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'
import EmbeddedController from './controller'

// Routes
import SyncRoutes from './sync-report/routes'
import PlatformRoutes from './platform/routes'

export function Routes() {
  const router = Router({ mergeParams: true })

  const controller = new EmbeddedController()
  router.get('/', controller.GET)

  router.use(`/platform/`, PlatformRoutes())
  router.use(`/sync`, SyncRoutes())

  return router
}

export const EmbeddedRoutes = ({ path }: { path: string }) => {
  logger.info('Initialiasing routes: Embedded Routes')

  const router = Router({ mergeParams: true })
  router.use(path, Routes())

  return router
}
