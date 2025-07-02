import { Router } from 'express'
import { Services } from '../../types/Services'

// Routes
import { RequestMissingReportRoutes } from './request-missing-report/routes'
import { DownloadReportRoutes } from './download-report/routes'
import { MyReportsRoutes } from './my-reports/routes'
import { ViewReportRoutes } from './view-report/routes'
import { RequestReportRoutes } from './request-report/routes'

export default function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use('/', RequestMissingReportRoutes({ path: '/dpr/request-missing-report', layoutPath, services }))
  router.use('/', DownloadReportRoutes({ path: '/dpr/download-report', layoutPath, services }))
  router.use('/', MyReportsRoutes({ path: '/dpr/my-reports', layoutPath, services }))
  router.use('/', ViewReportRoutes({ path: '/dpr/view-report', layoutPath, services }))
  router.use('/', RequestReportRoutes({ path: '/dpr/request-report', layoutPath, services }))

  return router
}
