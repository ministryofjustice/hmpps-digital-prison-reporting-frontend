import type { Router } from 'express'
import addAsyncReportingRoutes from './asyncReports'

import type { Services } from '../types/Services'
import logger from '../utils/logger'
import { getRoutePrefix } from '../utils/urlHelper'
import { DprConfig } from '../types/DprConfig'

import JourneyRoutes from './journeys/routes'

export default function routes(routeImportParams: {
  router: Router
  services: Services
  layoutPath: string
  config?: DprConfig
}) {
  const { router, services, layoutPath, config } = routeImportParams

  logger.info('Initialiasing DPR Embedded reports routes...')

  const params = {
    ...routeImportParams,
    prefix: getRoutePrefix(config),
  }

  addAsyncReportingRoutes(params)

  router.use('/', JourneyRoutes({ services, layoutPath }))
}
