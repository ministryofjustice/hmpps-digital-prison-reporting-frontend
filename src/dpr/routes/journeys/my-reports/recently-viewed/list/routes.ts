/* eslint-disable no-param-reassign */
import { Router } from 'express'
import RecentlyViewedReportsListController from './controller'
import { Services } from '../../../../../types/Services'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new RecentlyViewedReportsListController(layoutPath, services)
  router.get(`/`, controller.GET)

  return router
}

export default routes