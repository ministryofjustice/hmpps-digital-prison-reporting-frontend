import type { Router } from 'express'
import type { Services } from '../../src/dpr/types/Services'
import logger from '../../src/dpr/utils/logger'

import { ComponentRoutes } from './components/routes'
import { EmbeddedRoutes } from './embedded/routes'

export default function routes(routeImportParams: { router: Router; services: Services; layoutPath: string }) {
  const { router, layoutPath } = routeImportParams
  logger.info('Initialiasing Test app routes')

  router.use('/', ComponentRoutes({ path: '/components', layoutPath }))
  router.use('/', EmbeddedRoutes({ path: '/embedded', layoutPath }))

  return router
}
