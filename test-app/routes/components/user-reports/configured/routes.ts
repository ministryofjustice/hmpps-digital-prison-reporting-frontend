/* eslint-disable no-param-reassign */
import { Router } from 'express'
import UserReportsController from './controller'
import { Services } from 'src/dpr/types/Services'

export default function routes(services: Services): Router {
  const router = Router({ mergeParams: true })
  const controller = new UserReportsController(services)
  router.get('/', controller.GET)
  return router
}
