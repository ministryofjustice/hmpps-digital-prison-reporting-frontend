/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewSyncDashboardController from './controller'
import { Services } from '../../../../../types/Services'
import { loadReportDefinition } from '../../../../../middleware/loadReportDefinition'
import { validateFilters } from '../../../../../validation/validateFilters'
import { LoadType } from '../../../../../types/UserReports'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new ViewSyncDashboardController(layoutPath, services)

  router.get([`/`], controller.GET)

  // Interactive controls

  router.post(
    '/apply-filters',
    loadReportDefinition(services),
    validateFilters({ interactive: true, loadType: LoadType.SYNC }),
    controller.applyFilters,
  )
  router.post('/apply-filters', controller.applyFilters)
  router.post('/reset-filters', controller.resetFilters)

  return router
}

export default routes
