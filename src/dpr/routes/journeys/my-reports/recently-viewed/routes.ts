/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'
import RecentlyViewedReportsController from './controller'
import listRoutes from './list/routes'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RecentlyViewedReportsController(services)

  const asyncRemovePath = '/remove-item/:executionId/table-id/:tableId'
  const syncRemovePath = '/remove-item/report-id/:reportId/id/:id'
  router.post([asyncRemovePath, syncRemovePath], controller.POST)

  router.use(`/list`, listRoutes({ layoutPath, services }))

  return router
}

export default routes
