/* eslint-disable no-param-reassign */
import { Router } from 'express'
import logger from '../../../src/dpr/utils/logger'

// Routes
import SearchRoutes from './search/routes'
import CatalogueRoutes from './catalogue/routes'
import DashboardRoutes from './dashboards/routes'
import UserReportsRoutes from './user-reports/routes'
import FiltersRoutes from './filters/routes'

import ComponentsController from './controller'
import { Services } from 'src/dpr/types/Services'

export function Routes(services: Services) {
  const router = Router({ mergeParams: true })
  const controller = new ComponentsController()

  router.get('/', controller.GET)

  router.use(`/search`, SearchRoutes())
  router.use(`/catalogue`, CatalogueRoutes(services))
  router.use(`/user-reports`, UserReportsRoutes(services))
  router.use(`/dashboards`, DashboardRoutes())
  router.use(`/filters`, FiltersRoutes())

  return router
}

export const ComponentRoutes = ({ path, services }: { path: string; services: Services }) => {
  logger.info('Initialiasing routes: components')

  const router = Router({ mergeParams: true })
  router.use(path, Routes(services))
  return router
}
