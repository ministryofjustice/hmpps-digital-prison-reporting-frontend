/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ReportCatalogueController from './controller'

// Routes
import { Services } from '../../../types/Services'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }): Router {
  const router = Router({ mergeParams: true })
  const reportCatalogueController = new ReportCatalogueController(layoutPath, services)

  router.get('/', reportCatalogueController.GET)

  return router
}

export const ReportCatalogueRoutes = ({
  services,
  path,
  layoutPath,
}: {
  services: Services
  path: string
  layoutPath: string
}): Router => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes({ services, layoutPath }))

  return router
}
