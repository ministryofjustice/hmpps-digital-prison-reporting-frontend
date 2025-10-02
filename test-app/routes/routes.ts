import { Router } from 'express'
import logger from '../../src/dpr/utils/logger'

import { ComponentRoutes } from './components/routes'
import { EmbeddedRoutes } from './embedded/routes'
import { TemplateRoutes } from './report-templates/routes'
import HomeRoutes from './home/routes'
import { Services } from 'src/dpr/types/Services'

export default function routes(services: Services): Router {
  const router = Router({ mergeParams: true })

  logger.info('Initialiasing Test app routes')

  router.use('/', HomeRoutes())
  router.use('/', ComponentRoutes({ path: '/components', services }))
  router.use('/', EmbeddedRoutes({ path: '/embedded', services }))
  router.use('/', TemplateRoutes({ path: '/templates' }))

  return router
}
