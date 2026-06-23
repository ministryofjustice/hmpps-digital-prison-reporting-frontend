/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { ViewSyncDashboardController } from './controller'
import { ViewSyncController } from '../controller'
import { Services } from '../../../../../types/Services'
import { validateFilters } from '../../../../../validation/validateFilters'
import { LoadType } from '../../../../../types/UserReports'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new ViewSyncDashboardController(layoutPath, services)
  const viewSyncController = new ViewSyncController(layoutPath, services)

  router.get([`/`], controller.GET)

  // ----------------------------
  // Filters
  // ----------------------------
  router.post(
    '/apply-filters',
    validateFilters({ interactive: true, loadType: LoadType.SYNC }),
    controller.applyFilters,
  )
  router.post('/reset-filters', viewSyncController.resetFilters)

  // ----------------------------
  // User defined defaults
  // ----------------------------
  router.post('/save-defaults', viewSyncController.saveDefaultFilterValues)
  router.post('/remove-defaults', viewSyncController.removeDefaultFilterValues)

  return router
}

export default routes
