import type { Router } from 'express'
import addAsyncReportingRoutes from './asyncReports'
import addBookmarkingRoutes from './bookmarks'
import addDownloadRoutes from './download'
import addRecentlyViewedRoutes from './recentlyViewed'
import addSyncRoutes from './syncReports'

import type { Services } from '../types/Services'
import logger from '../utils/logger'

export default function routes(routeImportParams: { router: Router; services: Services; layoutPath: string }) {
  logger.info('Initialiasing DPR Embedded reports routes...')

  addAsyncReportingRoutes(routeImportParams)
  addRecentlyViewedRoutes(routeImportParams)
  addSyncRoutes(routeImportParams)

  const { bookmarkService, downloadPermissionService } = routeImportParams.services

  if (bookmarkService) {
    addBookmarkingRoutes(routeImportParams)
  }

  if (downloadPermissionService) {
    addDownloadRoutes(routeImportParams)
  }
}
