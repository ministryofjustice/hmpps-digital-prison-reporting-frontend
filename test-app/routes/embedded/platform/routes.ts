/* eslint-disable no-param-reassign */
import { Router } from 'express'
import platformRoutes from '../../../../dist/dpr/routes'

import initMockClients from '../../../utils/initMockClients'
import PlatformController from './controller'

// Routes
export default function routes() {
  const router = Router({ mergeParams: true })

  const { services } = initMockClients(router)
  const controller = new PlatformController(services)

  router.get('/', controller.GET)
  router.use('/', platformRoutes({ services, layoutPath: 'views/page.njk' }))

  return router
}
