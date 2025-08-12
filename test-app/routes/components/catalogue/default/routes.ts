/* eslint-disable no-param-reassign */
import { Router } from 'express'
import CatalogueController from './controller'
import initMockClients from '../../../../utils/initMockClients'

export default function routes() {
  const router = Router({ mergeParams: true })
  const { services } = initMockClients(router)
  const controller = new CatalogueController(services)
  router.get('/', controller.GET)
  return router
}
