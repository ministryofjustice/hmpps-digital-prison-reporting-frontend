/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'

// Routes
import viewReportRoutes from './report/routes'
import viewDashboardRoutes from './dashboard/routes'

// middleware
import reportAuthoriser from '../../../../middleware/reportAuthoriser'
import AsyncController from './controller'

export function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new AsyncController(layoutPath, services)

  // Expired check
  router.post(['/report', '/dashboard'], controller.POST)
  router.use('/report', reportAuthoriser(services, layoutPath), viewReportRoutes({ layoutPath, services }))
  router.use('/dashboard', reportAuthoriser(services, layoutPath), viewDashboardRoutes({ layoutPath, services }))
  return router
}

export default routes
