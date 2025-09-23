/* eslint-disable no-param-reassign */
import { Router } from 'express'
import { Services } from '../../../../types/Services'

// Routes
import loadReportRoutes from './load-report/routes'
import viewReportRoutes from './report/routes'

// middleware
import reportAuthoriser from '../../../../middleware/reportAuthoriser'

import SyncController from './controller'

export default function routes({ layoutPath, services }: { layoutPath: string; services: Services }) {
  const router = Router({ mergeParams: true })

  const controller = new SyncController(layoutPath, services)

  router.use('/report', reportAuthoriser(services, layoutPath), viewReportRoutes({ layoutPath, services }))
  router.use(`/load-report`, loadReportRoutes({ layoutPath, services }))

  router.post('/apply-filters', controller.applyFilters)
  router.post('/apply-columns', controller.applyColumns)

  return router
}
