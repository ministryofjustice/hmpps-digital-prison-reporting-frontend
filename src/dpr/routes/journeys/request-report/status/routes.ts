/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestStatusController from './controller'
import { Services } from '../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new RequestStatusController(layoutPath, services)

  router.get(`/`, controller.GET)
  router.post(`/`, controller.POST)
  router.delete(`/`, controller.DELETE)

  return router
}

export default routes
