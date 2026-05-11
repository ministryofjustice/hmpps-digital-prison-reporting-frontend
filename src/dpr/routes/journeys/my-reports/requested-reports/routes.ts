import { Router } from 'express'
import { Services } from '../../../../types/Services'
import RequestedReportsController from './controller'
import listRoutes from './list/routes'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new RequestedReportsController(services)

  router.get('/row/:reportId/:id/:executionId/:tableId', controller.GET)
  router.post('/remove-item/:executionId', controller.POST)
  router.use(`/list`, listRoutes({ layoutPath, services }))

  return router
}

export default routes
