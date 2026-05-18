/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestStatusController from './controller'
import { Services } from '../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RequestStatusController(layoutPath, services)

  // Status page
  router.get(`/`, controller.GET)

  // Dynamic loading route
  router.get('/current-status', controller.getCurrentStatus)

  return router
}

export default routes
