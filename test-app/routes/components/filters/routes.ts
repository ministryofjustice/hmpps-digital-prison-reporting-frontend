/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import AutocompleteRoutes from './autocomplete/routes'
import DateRoutes from './date/routes'
import DateRangeRoutes from './date-range/routes'
import GranularDateRangeRoutes from './granular-date-range/routes'
import MultiSelectRoutes from './multi-select/routes'

export default function routes() {
  const router = Router({ mergeParams: true })

  router.use(`/autocomplete`, AutocompleteRoutes())
  router.use(`/date`, DateRoutes())
  router.use(`/date-range`, DateRangeRoutes())
  router.use(`/granular-date-range`, GranularDateRangeRoutes())
  router.use(`/multi-select`, MultiSelectRoutes())

  return router
}
