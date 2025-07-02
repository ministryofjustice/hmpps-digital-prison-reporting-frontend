/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../types/Services'
import RequestReportController from './controller'

// Routes
import requestReportRoutes from './filters/routes'
import requestStatusRoutes from './status/routes'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new RequestReportController(layoutPath, services)
  router.use(`/:type/:reportId/:id/filters`, requestReportRoutes({ layoutPath, services }), controller.errorHandler)
  router.use(`/:type/:reportId/:id/status`, requestStatusRoutes({ layoutPath, services }), controller.errorHandler)

  return router
}

export const RequestReportRoutes = ({
  services,
  path,
  layoutPath,
}: {
  services: Services
  path: string
  layoutPath: string
}) => {
  const router = Router({ mergeParams: true })
  router.use(path, Routes({ services, layoutPath }))

  return router
}
