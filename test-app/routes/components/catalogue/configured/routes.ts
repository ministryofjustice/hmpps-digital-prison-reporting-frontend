/* eslint-disable no-param-reassign */
import { Router } from 'express'
import CatalogueController from './controller'
import { Services } from '../../../../../dpr/types/Services'

export default function routes(services: Services) {
  const router = Router({ mergeParams: true })
  const controller = new CatalogueController(services)
  router.get('/', controller.GET)
  return router
}
