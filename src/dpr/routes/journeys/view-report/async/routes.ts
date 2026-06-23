/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'

// Routes
import viewReportRoutes from './report/routes'
import viewDashboardRoutes from './dashboard/routes'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }): Router {
  const router = Router({ mergeParams: true })

  router.use('/report', viewReportRoutes({ layoutPath, services }))
  router.use('/dashboard', viewDashboardRoutes({ layoutPath, services }))

  return router
}

export default routes
