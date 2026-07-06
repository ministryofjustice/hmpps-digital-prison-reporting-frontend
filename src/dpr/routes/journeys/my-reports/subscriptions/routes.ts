import { Router } from 'express'
import { Services } from '../../../../types/Services'
import RequestedReportsController from './controller'
import listRoutes from './list/routes'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RequestedReportsController(services)

  // router.post('/:reportId/:id/list-unsubscribe', controller.POST)

  router.post('/:reportId/:id/subscribe', controller.Subscribe)

  router.post('/:reportId/:id/unsubscribe', controller.Unsubscribe)

  router.use(`/list`, listRoutes({ layoutPath, services }))

  return router
}

export default routes
