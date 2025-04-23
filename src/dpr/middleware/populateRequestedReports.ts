import { RequestHandler } from 'express'
import { Services } from '../types/Services'

export default (services: Services): RequestHandler => {
  return async (req, res, next) => {
    if (res.locals.user) {
      const { uuid: userId } = res.locals.user
      res.locals.requestedReports = await services.requestedReportService.getAllReports(userId)
      res.locals.recentlyViewedReports = await services.recentlyViewedService.getAllReports(userId)

      if (services.bookmarkService) {
        res.locals.bookmarkingEnabled = true
        res.locals.bookmarks = await services.bookmarkService.getAllBookmarks(userId)
      }

      if (services.downloadPermissionService) {
        res.locals.downloadingEnabled = true
      }
    }
    return next()
  }
}
