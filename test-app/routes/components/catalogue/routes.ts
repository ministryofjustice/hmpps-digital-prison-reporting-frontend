/* eslint-disable no-param-reassign */
import { Router } from 'express'
import CatalogueController from './controller'

import catalogueRoutes from './default/routes'
import configuredRoutes from './configured/routes'
import { Services } from 'src/dpr/types/Services'

export default function routes(services: Services) {
  const router = Router({ mergeParams: true })

  const controller = new CatalogueController()
  router.get('/', controller.GET)

  router.use(`/default`, catalogueRoutes(services))
  router.use(`/configured`, configuredRoutes(services))

  return router
}
