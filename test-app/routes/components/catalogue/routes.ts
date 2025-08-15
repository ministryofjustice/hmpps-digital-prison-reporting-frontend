/* eslint-disable no-param-reassign */
import { Router } from 'express'
import CatalogueController from './controller'

import catalogueRoutes from './default/routes'
import configuredRoutes from './configured/routes'

export default function routes() {
  const router = Router({ mergeParams: true })

  const controller = new CatalogueController()
  router.get('/', controller.GET)

  router.use(`/default`, catalogueRoutes())
  router.use(`/configured`, configuredRoutes())

  return router
}
