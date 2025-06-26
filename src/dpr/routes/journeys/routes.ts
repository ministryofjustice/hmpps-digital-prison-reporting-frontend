import { Router } from 'express'
import { Services } from '../../types/Services'

// Routes
import { RequestMissingReportRoutes } from './request-missing-report/routes'
import { BookmarkReportsRoutes } from './bookmarks/routes'
import { DownloadReportRoutes } from './download-report/routes'

export default function Routes({ layoutPath, services }: { services: Services; layoutPath: string }) {
  const router = Router({ mergeParams: true })

  router.use('/', RequestMissingReportRoutes({ path: '/dpr/request-missing-report', layoutPath, services }))
  router.use('/', BookmarkReportsRoutes({ path: '/dpr/bookmarks', layoutPath, services }))
  router.use('/', DownloadReportRoutes({ path: '/dpr/download-report', layoutPath, services }))

  return router
}
