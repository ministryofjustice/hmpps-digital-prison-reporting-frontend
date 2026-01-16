import { Router } from 'express'
import { ComponentRoutes } from './components/routes'
import { EmbeddedRoutes } from './embedded/routes'
import { TemplateRoutes } from './report-templates/routes'
import HomeRoutes from './home/routes'
import { Services } from '../../dpr/types/Services'

export default function routes(services: Services): Router {
  const router = Router({ mergeParams: true })
  router.use('/', HomeRoutes())
  router.use('/', ComponentRoutes({ path: '/components', services }))
  router.use('/', EmbeddedRoutes({ path: '/embedded', services }))
  router.use('/', TemplateRoutes({ path: '/templates' }))
  return router
}
