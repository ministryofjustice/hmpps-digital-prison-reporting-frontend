/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../types/Services'
import logger from '../../../utils/logger'

// Routes
import bookmarkRoutes from './bookmarks/routes'
import recentlyViewedRoutes from './recently-viewed/routes'
import requestedReportsRoutes from './requested-reports/routes'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use(`/bookmarks`, bookmarkRoutes({ layoutPath, services }))
  router.use(`/recently-viewed`, recentlyViewedRoutes({ layoutPath, services }))
  router.use(`/requested-reports`, requestedReportsRoutes({ layoutPath, services }))

  return router
}

export const MyReportsRoutes = ({
  services,
  path,
  layoutPath,
}: {
  services: Services
  path: string
  layoutPath: string
}) => {
  logger.info('Initialiasing routes: Recently Viewed')

  const router = Router({ mergeParams: true })
  router.use(path, Routes({ services, layoutPath }))
  return router
}
