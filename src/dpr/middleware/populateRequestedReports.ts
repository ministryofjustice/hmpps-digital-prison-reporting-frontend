import { RequestHandler, NextFunction, Response, Request } from 'express'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import DefinitionUtils from '../utils/definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'

export default (services: Services): RequestHandler => {
  return async (req, res, next) => {
    await populateRequestedReports(services, req, res, next)
    return next()
  }
}

export const populateRequestedReports = async (services: Services, req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user) {
    const { uuid: userId } = res.locals.user
    const { definitions, definitionsPath } = res.locals

    const requested = await services.requestedReportService.getAllReports(userId)
    res.locals.requestedReports = !definitionsPath
      ? requested
      : requested.filter((report: RequestedReport) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    const recent = await services.recentlyViewedService.getAllReports(userId)
    res.locals.recentlyViewedReports = !definitionsPath
      ? recent
      : recent.filter((report: StoredReportData) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    if (services.bookmarkService) {
      res.locals.bookmarkingEnabled = true

      const bookmarks = await services.bookmarkService.getAllBookmarks(userId)
      res.locals.bookmarks = !definitionsPath
        ? bookmarks
        : bookmarks.filter((bookmark: BookmarkStoreData) => {
            return DefinitionUtils.getCurrentVariantDefinition(definitions, bookmark.reportId, bookmark.id)
          })
    }

    if (services.downloadPermissionService) {
      res.locals.downloadingEnabled = true
    }
  }
}
