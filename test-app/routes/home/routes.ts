/* eslint-disable no-param-reassign */
import { Router } from 'express'
import PlatformRoutes from '../embedded/platform/routes'
import { Services } from 'src/dpr/types/Services'

export default function routes(services: Services): Router {
  const router = Router({ mergeParams: true })

  router.get('/', PlatformRoutes(services))

  return router
}
