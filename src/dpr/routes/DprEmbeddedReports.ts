import type { Router } from 'express'
import addAsyncReportingRoutes from './asyncReports'
import addBookmarkingRoutes from './bookmarks'
import addDownloadRoutes from './download'
import addRecentlyViewedRoutes from './recentlyViewed'
import addSyncRoutes from './syncReports'
import addRequestMissingReportRoutes from './requestMissingReport'

import type { Services } from '../types/Services'
import logger from '../utils/logger'
import { getRoutePrefix } from '../utils/urlHelper'
import { DprConfig } from '../types/DprConfig'

export default function routes(routeImportParams: {
  router: Router
  services: Services
  layoutPath: string
  config?: DprConfig
}) {
  logger.info('Initialiasing DPR Embedded reports routes...')

  const params = {
    ...routeImportParams,
    prefix: getRoutePrefix(routeImportParams?.config),
  }

  addAsyncReportingRoutes(params)
  addRecentlyViewedRoutes(params)
  addSyncRoutes(params)
  addRequestMissingReportRoutes(params)

  const { bookmarkService, downloadPermissionService } = routeImportParams.services

  if (bookmarkService) {
    addBookmarkingRoutes(params)
  }

  if (downloadPermissionService) {
    addDownloadRoutes(params)
  }
}
