/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewAsyncDashboardController from './controller'
import { Services } from '../../../../../types/Services'
import { validateFilters } from '../../../../../validation/validateFilters'
import { loadReportDefinition } from '../../../../../middleware/loadReportDefinition'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new ViewAsyncDashboardController(layoutPath, services)

  router.get(`/`, controller.GET)

  router.post(
    '/apply-filters',
    loadReportDefinition(services),
    validateFilters({ interactive: true }),
    controller.applyFilters,
  )

  router.post('/reset-filters', controller.resetFilters)

  return router
}

export default routes
