/* eslint-disable no-param-reassign */
import { Router } from 'express'
import UserReportsController from './controller'

import defaultRoutes from './default/routes'
import configuredRoutes from './configured/routes'
import { Services } from '../../../../dpr/types/Services'

export default function routes(services: Services) {
  const router = Router({ mergeParams: true })
  const controller = new UserReportsController()
  router.get('/', controller.GET)

  router.use('/default', defaultRoutes(services))
  router.use('/configured', configuredRoutes(services))

  return router
}
