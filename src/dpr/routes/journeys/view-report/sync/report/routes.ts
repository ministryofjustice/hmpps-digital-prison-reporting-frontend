/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewReportController from './controller'
import { Services } from '../../../../../types/Services'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new ViewReportController(layoutPath, services)

  router.get([`/`, `/download-disabled`], controller.GET)
  router.post('/apply-filters', controller.applyFilters)
  router.post('/apply-columns', controller.applyColumns)

  return router
}
