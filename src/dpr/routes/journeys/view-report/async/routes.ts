/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'

// Routes
import viewReportRoutes from './report/routes'
import viewDashboardRoutes from './dashboard/routes'

// middleware
import reportAuthoriser from '../../../../middleware/reportAuthoriser'
import AsyncController from './controller'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new AsyncController(layoutPath, services)

  router.post(['/report', '/dashboard'], controller.POST)
  router.post('/apply-filters', controller.applyFilters)
  router.post('/apply-columns', controller.applyColumns)

  router.use('/report', reportAuthoriser(services, layoutPath), viewReportRoutes({ layoutPath, services }))
  router.use('/dashboard', reportAuthoriser(services, layoutPath), viewDashboardRoutes({ layoutPath, services }))
  return router
}
