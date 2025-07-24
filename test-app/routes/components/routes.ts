/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'

// Routes
import SearchRoutes from './search/routes'
import CatalogueRoutes from './catalogue/routes'
import DashboardRoutes from './dashboards/routes'
import UserReportsRoutes from './user-reports/routes'
import FiltersRoutes from './filters/routes'

export function Routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use(`/search`, SearchRoutes({ layoutPath }))
  router.use(`/catalogue`, CatalogueRoutes({ layoutPath }))
  router.use(`/user-reports`, UserReportsRoutes({ layoutPath }))
  router.use(`/dashboards`, DashboardRoutes({ layoutPath }))
  router.use(`/filters`, FiltersRoutes({ layoutPath }))

  return router
}

export const ComponentRoutes = ({ path, layoutPath }: { path: string; layoutPath: string }) => {
  logger.info('Initialiasing routes: components')

  const router = Router({ mergeParams: true })
  router.use(path, Routes({ layoutPath }))
  return router
}
