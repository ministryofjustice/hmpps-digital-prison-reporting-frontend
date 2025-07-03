import type { Router } from 'express'
import type { Services } from '../types/Services'
import logger from '../utils/logger'
import JourneyRoutes from './journeys/routes'

export default function routes(routeImportParams: { router: Router; services: Services; layoutPath: string }) {
  const { router, services, layoutPath } = routeImportParams
  logger.info('Initialiasing DPR Embedded reports routes...')
  router.use('/', JourneyRoutes({ services, layoutPath }))
}
