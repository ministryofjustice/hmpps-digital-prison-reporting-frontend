import { type Response } from 'express'
import type { RecentlyViewedStoreService, RequestedReportService } from '../services'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData, UserReportData } from '../types/UserReports'
import { getCurrentVariantDefinition } from './definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'

export const removeDuplicates = async ({
  storeService,
  userId,
  id,
  search,
}: {
  storeService: RequestedReportService | RecentlyViewedStoreService
  userId: string
  id: string
  search: string
}) => {
  const reports = await storeService.getAllReportsById(id, userId)
  const duplicateIds = getDuplicateRequestIds(search, reports)
  if (duplicateIds.length) {
    await Promise.all(
      duplicateIds.map(async (duplicateId: string) => {
        await storeService.removeReport(duplicateId, userId)
      }),
    )
  }
}

/**
 * Gets the execution IDs of duplicate requests
 * - Checks whether the request query are the same
 *
 * @param {string} newReportSearchParams
 * @param {UserReportData[]} existingReports
 * @return {string[]}  ids of the duplicate requests
 */
export const getDuplicateRequestIds = (newReportSearchParams: string, existingReports: UserReportData[]) => {
  const duplicates: string[] = []
  const newQueryParams = new URLSearchParams(newReportSearchParams)

  existingReports.forEach((existingReportData: UserReportData) => {
    const matches: boolean[] = []
    const search = existingReportData.url?.request?.search || ''
    const existingQueryParams = new URLSearchParams(search)
    const { executionId } = existingReportData

    if (existingQueryParams.entries.length === newQueryParams.entries.length) {
      newQueryParams.forEach((newValue, newKey) => {
        const match = existingQueryParams.has(newKey, newValue)
        matches.push(match)
      })
    }
    if (matches.every(Boolean) && executionId) {
      duplicates.push(executionId)
    }
  })

  return duplicates
}

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
