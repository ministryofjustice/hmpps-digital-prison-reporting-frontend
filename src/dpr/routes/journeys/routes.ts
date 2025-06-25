import { Router } from 'express'

// Routes
import { RequestMissingReportRoutes } from './request-missing-report/routes'
import { Services } from '../../types/Services'

export default function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use('/', RequestMissingReportRoutes({ path: '/dpr/request-missing-report', layoutPath, services }))

  return router
}
