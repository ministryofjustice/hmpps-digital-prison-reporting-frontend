/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewSyncReportController from './controller'
import { Services } from '../../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new ViewSyncReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], controller.GET)

  // Interactive controls
  router.post('/apply-filters', controller.applyFilters)
  router.post('/apply-columns', controller.applyColumns)

  // User defined defaults
  router.post('/save-defaults', controller.saveDefaultFilterValues)
  router.post('/remove-defaults', controller.removeDefaultFilterValues)

  return router
}

export default routes
