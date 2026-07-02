import { type Response } from 'express'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import { getCurrentVariantDefinition } from './definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'
import * as MyReportsUtils from '../routes/journeys/my-reports/utils'

/**
 * Get all Requested and Viewed reports
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
export const getAllMyReports = async (res: Response, services: Services, dprUserId: string) => {
  const recentlyViewedReports = await getRecentlyViewedReports(res, services, dprUserId)

  const requestedReports = await getRequestedReports(res, services, dprUserId)

  const subscriptions = await getSubscriptions(res, services, dprUserId)

  return {
    requestedReports,
    recentlyViewedReports,
    subscriptions,
  }
}

const getRecentlyViewedReports = async (res: Response, services: Services, dprUserId: string) => {
  const { definitions, definitionsPath } = res.locals

  // 1. Get the recently viewed reports
  let recentlyViewedReports = await MyReportsUtils.getAllMyReports('recentlyViewedReports', services, dprUserId)

  recentlyViewedReports = !definitionsPath
    ? recentlyViewedReports
    : recentlyViewedReports.filter((report: StoredReportData) => {
        return getCurrentVariantDefinition(definitions, report.reportId, report.id)
      })

  // 2. Clean and get requested reports
  await services.requestedReportService.cleanList(dprUserId, recentlyViewedReports)

  return recentlyViewedReports
}

const getRequestedReports = async (res: Response, services: Services, dprUserId: string) => {
  const { definitions, definitionsPath } = res.locals
  let requestedReports = await MyReportsUtils.getAllMyReports('requestedReports', services, dprUserId)

  requestedReports = !definitionsPath
    ? requestedReports
    : requestedReports.filter((report: RequestedReport) => {
        return getCurrentVariantDefinition(definitions, report.reportId, report.id)
      })

  return requestedReports
}

const getSubscriptions = async (res: Response, services: Services, dprUserId: string) => {
  const { definitions, definitionsPath, token, dprUser } = res.locals
  let subscriptions = await MyReportsUtils.getAllMyReports('subscriptions', services, dprUserId)

  if (subscriptions.length) {
    subscriptions = !definitionsPath
      ? subscriptions
      : subscriptions.filter((report: RequestedReport) => {
          return getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    const subsTableIds = subscriptions
      .map(sub => sub.tableId)
      .filter((tableId): tableId is string => tableId !== undefined)

    const timestampData = await services.reportingService.getDatasetTimestamps(token, subsTableIds)

    subscriptions = await services.subscriptionService.updateTimestamps(timestampData, dprUser.id)
  }

  return subscriptions
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

/**
 * Gets the report title data from report state
 * - old versions of the schema store use variantName
 *
 * @param {StoredReportData} data
 * @return {*}
 */
export const getReportTitleData = (data: StoredReportData) => {
  const productName = data.reportName ?? 'unknown-product'
  const reportName = data.name ?? data.variantName ?? 'unknown-report'

  return {
    productName,
    reportName,
  }
}
