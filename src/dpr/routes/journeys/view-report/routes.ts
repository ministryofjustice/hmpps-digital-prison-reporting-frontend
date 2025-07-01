/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../types/Services'
import ViewReportController from './controller'

// Routes
import viewSyncReportRoutes from './sync/routes'
import viewAyncReportRoutes from './async/routes'

export function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  const controller = new ViewReportController(layoutPath, services)
  router.use(`/sync/:type/:reportId/:id`, viewSyncReportRoutes({ layoutPath, services }), controller.errorHandler)
  router.use(
    `/async/:type/:reportId/:id/:tableId/`,
    viewAyncReportRoutes({ layoutPath, services }),
    controller.errorHandler,
  )

  return router
}

export const ViewReportRoutes = ({
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
