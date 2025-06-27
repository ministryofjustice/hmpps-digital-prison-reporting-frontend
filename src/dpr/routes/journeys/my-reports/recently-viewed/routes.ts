/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'
import RecentlyViewedReportsController from './controller'
import listRoutes from './list/routes'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new RecentlyViewedReportsController(layoutPath, services)

  router.post('/get-expired-status', controller.getExpiredStatus)
  router.post('/remove-item', controller.removeViewedItem)

  router.use(`/list`, listRoutes({ layoutPath, services }))

  return router
}
