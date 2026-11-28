import { Router } from 'express'
import InternalRequestReportController from './controller'
import { Services } from '../../../../types/Services'

// middleware

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })
  const controller = new InternalRequestReportController(layoutPath, services)

  /**
   *  Make the internal request
   */
  router.get('/', controller.GET)

  return router
}

export default routes
