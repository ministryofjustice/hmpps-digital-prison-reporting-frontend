import { type Response } from 'express'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import { BookmarkStoreData } from '../types/Bookmark'
import * as MyReportsUtils from '../routes/journeys/my-reports/utils'
import { getRefreshedSubscriptionsAndUpdateTimestamp } from './Subscriptions/utils'

export type AllReportsFromState = {
  requestedReports: StoredReportData[]
  recentlyViewedReports: RequestedReport[]
  subscriptions: StoredReportData[]
  bookmarks: BookmarkStoreData[]
}
/**
 * Get all Requested and Viewed reports
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
export const getAllMyReports = async (
  res: Response,
  services: Services,
  dprUserId: string,
): Promise<AllReportsFromState> => {
  const recentlyViewedReports = await getRecentlyViewedReports(services, dprUserId)

  const requestedReports = await getRequestedReports(services, dprUserId)

  const subscriptions = await getSubscriptions(res, services, dprUserId)

  const bookmarks = await getAllMyBookmarks(services, dprUserId)

  return {
    requestedReports,
    recentlyViewedReports,
    subscriptions,
    bookmarks,
  }
}

/**
 * Get the recently viewed report data from redis
 * - checks it against the current definition path
 * - removes it from the list if no matching definition
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
const getRecentlyViewedReports = async (services: Services, dprUserId: string) => {
  // 1. Get the recently viewed reports
  const recentlyViewedReports = await MyReportsUtils.getAllMyReports('recentlyViewedReports', services, dprUserId)

  // 2. Clean and get requested reports
  await services.requestedReportService.cleanList(dprUserId, recentlyViewedReports)

  return recentlyViewedReports
}

/**
 * Get the requested reports data from redis
 * - checks it against the current definition path
 * - removes it from the list if no matching definition
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
const getRequestedReports = async (services: Services, dprUserId: string) => {
  const requestedReports = await MyReportsUtils.getAllMyReports('requestedReports', services, dprUserId)

  return requestedReports
}

/**
 * Get the subscription data from redis
 * - checks it against the current definition path
 * - removes it from the list if no matching definition
 * - Updates state with refreshed timestamps
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
const getSubscriptions = async (res: Response, services: Services, dprUserId: string) => {
  let subscriptions = await MyReportsUtils.getAllMyReports('subscriptions', services, dprUserId)

  if (subscriptions.length) {
    // Update subscriptions with refreshed timestamp
    subscriptions = await getRefreshedSubscriptionsAndUpdateTimestamp(res, services, subscriptions)
  }

  return subscriptions
}

/**
 * Get all the bookmarks
 * - checks it against the current definition path
 * - removes it from the list if no matching definition
 *
 * @param {Response} res
 * @param {Services} services
 * @param {string} dprUserId
 * @return {*}
 */
export const getAllMyBookmarks = async (services: Services, dprUserId: string) => {
  const bookmarks = await services.bookmarkService.getAllBookmarks(dprUserId)

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
