import addAsyncReportingRoutes from './asyncReports'
import addBookmarkingRoutes from './bookmarks'
import addDownloadRoutes from './download'
import addRecentlyViewedRoutes from './recentlyViewed'
import addSyncRoutes from './syncReports'

import type { Router } from 'express'
import type { Services } from '../types/Services'

export default function routes(routeImportParams: {
  router: Router
  services: Services
  layoutPath: string
}){
  addAsyncReportingRoutes(routeImportParams)
  addBookmarkingRoutes(routeImportParams)
  addDownloadRoutes(routeImportParams)
  addRecentlyViewedRoutes(routeImportParams)
  addSyncRoutes(routeImportParams)
}
