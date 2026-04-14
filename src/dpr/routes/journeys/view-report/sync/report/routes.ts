/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewSyncReportController from './controller'
import { Services } from '../../../../../types/Services'
import { loadReportDefinition } from '../../../../../middleware/loadReportDefinition'
import { validateFilters } from '../../../../../validation/validateFilters'
import { LoadType } from '../../../../../types/UserReports'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new ViewSyncReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], controller.GET)

  // ----------------------------
  // FILTERS
  // ----------------------------
  router.post(
    '/apply-filters',
    loadReportDefinition(services),
    validateFilters({ interactive: true, loadType: LoadType.SYNC }),
    controller.applyFilters,
  )
  router.post('/reset-filters', controller.resetFilters)

  // ---------------------------
  // COLUMNS
  // ----------------------------
  router.post('/apply-columns', controller.applyColumns)
  router.post('/reset-columns', controller.resetColumns)

  // ----------------------------
  // User defined defaults
  // ----------------------------
  router.post('/save-defaults', controller.saveDefaultFilterValues)
  router.post('/remove-defaults', controller.removeDefaultFilterValues)

  return router
}

export default routes
