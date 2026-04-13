import { Router } from 'express'
import ViewAsyncReportController from './controller'
import ViewReportController from '../controller'
import { Services } from '../../../../../types/Services'
import { loadReportDefinition } from 'src/dpr/middleware/loadReportDefinition'
import { validateFilters } from 'src/dpr/validation/validateFIlters'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const asyncReportController = new ViewAsyncReportController(layoutPath, services)
  const viewReportController = new ViewReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], asyncReportController.GET)

  // ----------------------------
  // FILTERS
  // ----------------------------
  router.post(
    '/apply-filters',
    loadReportDefinition(services),
    validateFilters({ interactive: true }),
    asyncReportController.applyFilters,
  )
  router.post('/reset-filters', asyncReportController.resetFilters)

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
