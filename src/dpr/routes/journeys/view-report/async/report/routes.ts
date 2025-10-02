/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewAsyncReportController from './controller'
import ViewReportController from '../controller'
import { Services } from '../../../../../types/Services'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const asynReportController = new ViewAsyncReportController(layoutPath, services)
  const viewReportController = new ViewReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], asynReportController.GET)

  router.post('/apply-filters', asynReportController.applyFilters)
  router.post('/apply-columns', asynReportController.applyColumns)

  // User defined defaults
  router.post('/save-defaults', viewReportController.saveDefaultFilterValues)
  router.post('/remove-defaults', viewReportController.removeDefaultFilterValues)

  return router
}
