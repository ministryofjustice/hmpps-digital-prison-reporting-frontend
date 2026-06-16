import { Router } from 'express'
import { ViewAsyncReportController } from './controller'
import { ViewAsyncController } from '../controller'
import { Services } from '../../../../../types/Services'
import { validateFilters } from '../../../../../validation/validateFilters'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const asyncReportController = new ViewAsyncReportController(layoutPath, services)
  const viewReportController = new ViewAsyncController(layoutPath, services)

  router.get([`/`, `/download-disabled`], viewReportController.GET)

  // ----------------------------
  // FILTERS
  // ----------------------------
  router.post('/apply-filters', validateFilters({ interactive: true }), asyncReportController.applyFilters)
  router.post('/reset-filters', viewReportController.resetFilters)

  // ---------------------------
  // COLUMNS
  // ----------------------------
  router.post('/apply-columns', asyncReportController.applyColumns)
  router.post('/reset-columns', asyncReportController.resetColumns)

  // ----------------------------
  // User defined defaults
  // ----------------------------
  router.post('/save-defaults', viewReportController.saveDefaultFilterValues)
  router.post('/remove-defaults', viewReportController.removeDefaultFilterValues)

  return router
}

export default routes
