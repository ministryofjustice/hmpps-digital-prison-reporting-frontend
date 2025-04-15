import type { Router } from 'express'
import addAsyncReportingRoutes from './asyncReports'
import addBookmarkingRoutes from './bookmarks'
import addDownloadRoutes from './download'
import addRecentlyViewedRoutes from './recentlyViewed'
import addSyncRoutes from './syncReports'

import type { Services } from '../types/Services'

interface Features {
  bookmarking: boolean,
  download: boolean
}

export default function routes(routeImportParams: { router: Router; services: Services; layoutPath: string, features?: Features }) {

  addAsyncReportingRoutes(routeImportParams)
  addRecentlyViewedRoutes(routeImportParams)
  addSyncRoutes(routeImportParams)

  const { features } = routeImportParams
  if( features?.bookmarking === undefined  || features.bookmarking ) {
    addBookmarkingRoutes(routeImportParams)
  }
  if( features?.download === undefined || features.download ) {
    addDownloadRoutes(routeImportParams)
  }
}
