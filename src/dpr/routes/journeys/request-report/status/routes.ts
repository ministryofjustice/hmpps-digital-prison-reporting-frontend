/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RequestStatusController from './controller'
import { Services } from '../../../../types/Services'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new RequestStatusController(layoutPath, services)

  router.get(`/`, controller.GET)
  router.post(`/`, controller.POST)

  // TODO: convert to delete once fetch has been updated
  router.post(`/cancel`, controller.cancelRequest)

  return router
}
