/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewAsyncReportController from './controller'
import ViewReportController from '../controller'
import { Services } from '../../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const asyncReportController = new ViewAsyncReportController(layoutPath, services)
  const viewReportController = new ViewReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], asyncReportController.GET)

  router.post('/apply-filters', asyncReportController.applyFilters)
  router.post('/apply-columns', asyncReportController.applyColumns)

  // User defined defaults
  router.post('/save-defaults', viewReportController.saveDefaultFilterValues)
  router.post('/remove-defaults', viewReportController.removeDefaultFilterValues)

  return router
}

export default routes