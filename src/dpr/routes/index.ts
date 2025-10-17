import { Router } from 'express'
import type { Services } from '../types/Services'
import logger from '../utils/logger'
import JourneyRoutes from './journeys/routes'
// middleware
import setUpNestedRoute from '../middleware/setUpNestedRoute'

function routes(routeImportParams: { services: Services; layoutPath: string }) {
  logger.info('Initialiasing DPR Embedded reports routes...')

  const router = Router({ mergeParams: true })
  router.use('/', setUpNestedRoute(), JourneyRoutes(routeImportParams))
  return router
}

export default routes