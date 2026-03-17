/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { ReportHeadingController } from './controller'

export function ReportHeadingRoutes(): Router {
  const router = Router({ mergeParams: true })
  const controller = new ReportHeadingController()
  router.get('/', controller.GET)
  return router
}
