/* eslint-disable no-param-reassign */
import { Router } from 'express'

import FeaturesController from './controller'
import InternalLinkingRoutes from './internal-linking/routes'

export function Routes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new FeaturesController()

  router.get('/', controller.GET)

  router.use(`/internal-linking`, InternalLinkingRoutes())

  return router
}

export const FeaturesRoutes = ({ path }: { path: string }): Router => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes())
  return router
}
