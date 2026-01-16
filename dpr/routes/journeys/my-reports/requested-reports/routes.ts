/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'
import RequestedReportsController from './controller'
import listRoutes from './list/routes'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new RequestedReportsController(services)
  router.post('/:id', controller.POST)

  router.use(`/list`, listRoutes({ layoutPath, services }))
  return router
}

export default routes
