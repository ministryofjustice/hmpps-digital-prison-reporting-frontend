/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewSyncDashboardController from './controller'
import { Services } from '../../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new ViewSyncDashboardController(layoutPath, services)

  router.get([`/`], controller.GET)

  // Interactive controls
  router.post('/apply-filters', controller.applyFilters)

  return router
}

export default routes
