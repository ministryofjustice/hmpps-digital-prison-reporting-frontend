/* eslint-disable no-param-reassign */
import { Router } from 'express'

// Routes
import AutocompleteRoutes from './autocomplete/routes'
import DateRoutes from './date/routes'
import DateRangeRoutes from './date-range/routes'
import GranularDateRangeRoutes from './granular-date-range/routes'
import MultiSelectRoutes from './multi-select/routes'

export default function routes({ layoutPath }: { layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use(`/autocomplete`, AutocompleteRoutes({ layoutPath }))
  router.use(`/date`, DateRoutes({ layoutPath }))
  router.use(`/date-range`, DateRangeRoutes({ layoutPath }))
  router.use(`/granular-date-range`, GranularDateRangeRoutes({ layoutPath }))
  router.use(`/multi-select`, MultiSelectRoutes({ layoutPath }))

  return router
}
