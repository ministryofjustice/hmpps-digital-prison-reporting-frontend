/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'

// Routes
import SyncRoutes from './sync/routes'
import PlatformRoutes from './platform/routes'

export function Routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use(`/platform`, PlatformRoutes({ layoutPath }))
  router.use(`/sync`, SyncRoutes({ layoutPath }))

  return router
}

export const ComponentRoutes = ({ path, layoutPath }: { path: string; layoutPath: string }) => {
  logger.info('Initialiasing routes: components')

  const router = Router({ mergeParams: true })
  router.use(path, Routes({ layoutPath }))
  return router
}
