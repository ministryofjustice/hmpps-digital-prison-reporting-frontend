/* eslint-disable no-param-reassign */
import { Router } from 'express'
import MyReportsCatalogueController from './controller'

// Routes
import { Services } from '../../../types/Services'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }): Router {
  const router = Router({ mergeParams: true })
  const myReportsCatalogueController = new MyReportsCatalogueController(layoutPath, services)

  router.get('/', myReportsCatalogueController.GET)

  return router
}

export const MyReportsCatalogueRoutes = ({
  services,
  layoutPath,
}: {
  services: Services
  layoutPath: string
}): Router => {
  const router = Router({ mergeParams: true })
  router.use('/', Routes({ services, layoutPath }))

  return router
}
