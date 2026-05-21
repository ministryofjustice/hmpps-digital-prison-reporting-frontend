import { type Response } from 'express'
import { RequestStatus, StoredReportData } from '../types/UserReports'
import { Services } from '../types/Services'
import { getAllMyReports } from './reportStoreHelper'

const STALE_INTERVAL = 14 * 24 * 60 * 60 * 1000 // Two weeks

/**
 * Gets the reports that are stale
 *
 * @param {StoredReportData[]} reports
 * @return {*}
 */
const getStaleReports = (reports: StoredReportData[]) => {
  const now = Date.now()

  return reports.filter((report) => {
    const timestamp = getTerminalTimestamp(report)
    if (!timestamp) return false

    return now - timestamp > STALE_INTERVAL
  })
}

/**
 * Gets the timestamp of potentially stale reports
 *
 * @param {StoredReportData} report
 * @return {*}  {(number | null)}
 */
const getTerminalTimestamp = (report: StoredReportData): number | null => {
  const ts = report.timestamp

  switch (report.status) {
    case RequestStatus.EXPIRED:
      return ts?.expired ? new Date(ts.expired).getTime() : null

    case RequestStatus.FAILED:
      return ts?.failed ? new Date(ts.failed).getTime() : null

    case RequestStatus.ABORTED:
      return ts?.aborted ? new Date(ts.aborted).getTime() : null

    default:
      return null
  }
}

/**
 * Sets a flash message to show to the user
 *
 * @param {Response} res
 * @param {number} count
 */
const flashRemovedReports = (res: Response, count: number) => {
  if (!count) return

  const message =
    count === 1 ? '1 stale report was removed from your list' : `${count} stale reports were removed from your list`

  res.req?.flash('info', message)
}

/**
 * Checks for stale reports and removes them
 *
 * @param {Services} services
 * @param {string} userId
 * @param {StoredReportData[]} requestedReports
 * @param {StoredReportData[]} recentlyViewedReports
 * @param {Response} res
 * @return {*}
 */
export const cleanupReports = async (
  services: Services,
  userId: string,
  requestedReports: StoredReportData[],
  recentlyViewedReports: StoredReportData[],
  res: Response,
) => {
  const req = res.req as any

  if (req.session?.reportsCleanupRun) {
    return {
      requestedReports,
      recentlyViewedReports,
    }
  }

  if (req.session) {
    req.session.reportsCleanupRun = true
  }

  const staleRequested = getStaleReports(requestedReports)
  const staleRecent = getStaleReports(recentlyViewedReports)

  const totalRemoved = staleRequested.length + staleRecent.length

  if (totalRemoved === 0) {
    return { requestedReports, recentlyViewedReports }
  }

  await Promise.all([
    ...staleRequested.map((report) => services.requestedReportService.removeReport(report.executionId || '', userId)),
    ...staleRecent.map((report) =>
      services.recentlyViewedService.removeReport(userId, report.reportId, report.id, report.tableId),
    ),
  ])

  flashRemovedReports(res, totalRemoved)

  const refreshed = await getAllMyReports(res, services, userId)

  return {
    requestedReports: refreshed.requestedReports,
    recentlyViewedReports: refreshed.recentlyViewedReports,
  }
}
