/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'

// Routes
import SearchRoutes from './search/routes'
import CatalogueRoutes from './catalogue/routes'
import DashboardRoutes from './dashboards/routes'
import UserReportsRoutes from './user-reports/routes'
import FiltersRoutes from './filters/routes'

export function Routes() {
  const router = Router({ mergeParams: true })

  router.use(`/search`, SearchRoutes())
  router.use(`/catalogue`, CatalogueRoutes())
  router.use(`/user-reports`, UserReportsRoutes())
  router.use(`/dashboards`, DashboardRoutes())
  router.use(`/filters`, FiltersRoutes())

  return router
}

export const ComponentRoutes = ({ path }: { path: string }) => {
  logger.info('Initialiasing routes: components')

  const router = Router({ mergeParams: true })
  router.use(path, Routes())
  return router
}
