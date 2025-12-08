/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'

// Routes
import loadReportRoutes from './load-report/routes'
import viewReportRoutes from './report/routes'
import viewDashboardRoutes from './dashboard/routes'

// middleware
import reportAuthoriser from '../../../../middleware/reportAuthoriser'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  router.use('/report', reportAuthoriser(services, layoutPath), viewReportRoutes({ layoutPath, services }))
  router.use('/dashboard', reportAuthoriser(services, layoutPath), viewDashboardRoutes({ layoutPath, services }))
  router.use(`/load-report`, loadReportRoutes({ layoutPath, services }))

  return router
}

export default routes
