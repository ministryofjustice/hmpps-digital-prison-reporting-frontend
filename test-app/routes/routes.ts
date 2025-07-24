import { Router } from 'express'
import logger from '../../src/dpr/utils/logger'

import { ComponentRoutes } from './components/routes'
import { EmbeddedRoutes } from './embedded/routes'
import HomeRoutes from './home/routes'

export default function routes(): Router {
  const router = Router({ mergeParams: true })

  logger.info('Initialiasing Test app routes')

  router.use('/', HomeRoutes())
  router.use('/', ComponentRoutes({ path: '/components' }))
  router.use('/', EmbeddedRoutes({ path: '/embedded' }))

  return router
}
