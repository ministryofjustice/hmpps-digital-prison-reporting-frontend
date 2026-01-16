/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestReportController from './controller'
import { Services } from '../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new RequestReportController(layoutPath, services)

  router.get('/', controller.GET)
  router.post('/', controller.POST)
  router.post('/save-defaults', controller.saveDefaultFilterValues)
  router.post('/remove-defaults', controller.removeDefaultFilterValues)

  return router
}

export default routes
