/* eslint-disable no-param-reassign */
import { Router } from 'express'
import UserReportsController from './controller'

import defaultRoutes from './default/routes'
import configuredRoutes from './configured/routes'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new UserReportsController()
  router.get('/', controller.GET)

  router.use('/default', defaultRoutes())
  router.use('/configured', configuredRoutes())

  return router
}
