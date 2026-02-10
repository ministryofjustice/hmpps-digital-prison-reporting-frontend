import { Router } from 'express'
import type { Services } from '../types/Services'
import logger from '../utils/logger'
import JourneyRoutes from './journeys/routes'
// middleware
import setUpNestedRoute from '../middleware/setUpNestedRoute'
import { errorRequestHandler } from '../middleware/setUpDprResources'

export function routes(routeImportParams: { services: Services; layoutPath: string }): Router {
  logger.info('Initialiasing DPR routes...')
  const router = Router({ mergeParams: true })
  router.use(
    '/',
    setUpNestedRoute(),
    JourneyRoutes(routeImportParams),
    errorRequestHandler(routeImportParams.layoutPath),
  )
  return router
}

export default routes
