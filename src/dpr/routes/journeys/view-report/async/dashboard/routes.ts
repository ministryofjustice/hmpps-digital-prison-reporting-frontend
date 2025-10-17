/* eslint-disable no-param-reassign */
import { Router } from 'express'
import ViewAsyncDashboardController from './controller'
import { Services } from '../../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })
  const controller = new ViewAsyncDashboardController(layoutPath, services)

  router.get(`/`, controller.GET)
  router.post('/apply-filters', controller.applyFilters)

  return router
}

export default routes