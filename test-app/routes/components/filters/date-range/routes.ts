/* eslint-disable no-param-reassign */
import { Router } from 'express'
import DateRangeController from './controller'

import dateRangeRoutes from './no-default/routes'
import defaultDateRangeRoutes from './default/routes'
import minMaxDateRangeRoutes from './min-max/routes'
import relativeDateRangeRoutes from './relative-date/routes'
import relativeMinMaxDateRangeRoutes from './relative-date-min-max/routes'

export default function routes() {
  const router = Router({ mergeParams: true })
  const controller = new DateRangeController()
  router.get('/', controller.GET)

  router.use(`/date-range`, dateRangeRoutes())
  router.use(`/default-date-range`, defaultDateRangeRoutes())
  router.use(`/min-max-date-range`, minMaxDateRangeRoutes())
  router.use(`/relative-date-range`, relativeDateRangeRoutes())
  router.use(`/relative-min-max-date-range`, relativeMinMaxDateRangeRoutes())

  return router
}
