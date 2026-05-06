import { type Response } from 'express'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import { getCurrentVariantDefinition } from './definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'

/**
 * Get all Requested and Viewed reports
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
export const getAllMyReports = async (res: Response, services: Services, dprUserId: string) => {
  const { definitions, definitionsPath } = res.locals

  // 1. Get the recently viewed reports
  let recentlyViewedReports = await services.recentlyViewedService.getAllReports(dprUserId)
  recentlyViewedReports = !definitionsPath
    ? recentlyViewedReports
    : recentlyViewedReports.filter((report: StoredReportData) => {
        return getCurrentVariantDefinition(definitions, report.reportId, report.id)
      })

  // 2. Clean and get requested reports
  await services.requestedReportService.cleanList(dprUserId, recentlyViewedReports)
  let requestedReports = await services.requestedReportService.getAllReports(dprUserId)
  requestedReports = !definitionsPath
    ? requestedReports
    : requestedReports.filter((report: RequestedReport) => {
        return getCurrentVariantDefinition(definitions, report.reportId, report.id)
      })

  return {
    requestedReports,
    recentlyViewedReports,
  }
}

/**
 * Get all the bookmarks
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
export const getAllMyBookmarks = async (res: Response, services: Services, dprUserId: string) => {
  const { definitions, definitionsPath } = res.locals

  let bookmarks = await services.bookmarkService.getAllBookmarks(dprUserId)
  bookmarks = !definitionsPath
    ? bookmarks
    : bookmarks.filter((bookmark: BookmarkStoreData) => {
        return getCurrentVariantDefinition(definitions, bookmark.reportId, bookmark.id)
      })

  return bookmarks
}
