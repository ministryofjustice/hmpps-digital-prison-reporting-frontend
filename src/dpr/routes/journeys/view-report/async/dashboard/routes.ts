import { Router } from 'express'
import { ViewAsyncDashboardController } from './controller'
import { ViewAsyncController } from '../controller'
import { Services } from '../../../../../types/Services'
import { validateFilters } from '../../../../../validation/validateFilters'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new ViewAsyncDashboardController(layoutPath, services)
  const viewReportController = new ViewAsyncController(layoutPath, services)

  router.get(`/`, viewReportController.GET)

  // ----------------------------
  // FILTERS
  // ----------------------------
  router.post('/apply-filters', validateFilters({ interactive: true }), controller.applyFilters)
  router.post('/reset-filters', viewReportController.resetFilters)

  // ----------------------------
  // User defined defaults
  // ----------------------------
  router.post('/save-defaults', viewReportController.saveDefaultFilterValues)
  router.post('/remove-defaults', viewReportController.removeDefaultFilterValues)

  return router
}

export default routes
