import { Router } from 'express'
import { ComponentRoutes } from './components/routes'
import { EmbeddedRoutes } from './embedded/routes'
import { TemplateRoutes } from './report-templates/routes'
import PlatformRoutes from './embedded/platform/routes'
import { Services } from '../../src/dpr/types/Services'

export default function routes(services: Services): Router {
  const router = Router({ mergeParams: true })
  router.use('/', PlatformRoutes(services))
  router.use('/', ComponentRoutes({ path: '/components', services }))
  router.use('/', EmbeddedRoutes({ path: '/embedded', services }))
  router.use('/', TemplateRoutes({ path: '/templates' }))
  return router
}
