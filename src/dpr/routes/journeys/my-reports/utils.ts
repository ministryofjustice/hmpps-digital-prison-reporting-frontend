import { Services } from 'src/dpr/types/Services'
import { RecentlyViewedReport, RequestedReport, StoredReportData } from 'src/dpr/types/UserReports'
import { captureDprError, LoggerErrorType } from 'src/dpr/utils/captureError'
import { RequestedReportSchema } from './requested-reports/validation'
import { ViewedReportSchema } from './recently-viewed/validation'

interface GetRemoveMyReportData {
  reportId?: string | undefined
  id?: string | undefined
  executionId?: string | undefined
  tableId?: string | undefined
}

/**
 * Get a single report from My reports
 * - validates the report and removes if invalid
 *
 * @param {GetRemoveMyReportData} reportData
 * @param {('requested' | 'viewed')} type
 * @param {Services} services
 * @param {string} userId
 * @return {*}  {(Promise<RequestedReport | RecentlyViewedReport | undefined>)}
 */
export const getMyReport = async (
  reportData: GetRemoveMyReportData,
  type: 'requestedReports' | 'recentlyViewedReports',
  services: Services,
  userId: string,
): Promise<RequestedReport | RecentlyViewedReport | undefined> => {
  const rawReport = await fetchReport(type, reportData, services, userId)

  if (!rawReport) {
    return undefined
  }

  const schema = getSchema(type)

  const result = schema.safeParse(rawReport)

  if (!result.success) {
    captureDprError(result.error, 'Invalid Redis payload')
    try {
      await removeMyReport(type, reportData, services, userId)
    } catch (cleanupError) {
      const meta = rawReport
        ? {
            id: rawReport.id ?? 'unknown',
            reportId: rawReport.reportId ?? 'unknown',
            tableId: rawReport.tableId ?? 'unknown',
            executionId: rawReport.executionId ?? 'unknown',
            loadType: rawReport.loadType as string,
          }
        : {}
      captureDprError(cleanupError, 'Failed to remove invalid report', meta)
    }

    return undefined
  }

  return result.data
}

/**
 * Gets all My Reports for a particular type
 * - validats the list and removes invalid ones
 *
 * @param {('requested' | 'viewed')} type
 * @param {Services} services
 * @param {string} userId
 * @return {*}  {(Promise<(RequestedReport | RecentlyViewedReport)[]>)}
 */
export const getAllMyReports = async (
  type: 'requestedReports' | 'recentlyViewedReports' | 'subscriptions',
  services: Services,
  userId: string,
): Promise<(RequestedReport | RecentlyViewedReport)[]> => {
  const service = getService(type, services)
  const schema = getSchema(type)

  const reports: StoredReportData[] = await service.getAllReports(userId)

  const results = await Promise.all(
    reports.map(async rawReport => {
      const result = schema.safeParse(rawReport)

      if (result.success) {
        return result.data
      }

      const { id, reportName, reportId, loadType } = rawReport
      const errorMeta = {
        id,
        type,
        reportName,
        reportId,
        loadType: loadType as string,
      }

      captureDprError(result.error, 'Invalid Redis payload', errorMeta, LoggerErrorType.WARN)

      try {
        const report = rawReport as Partial<GetRemoveMyReportData>

        await removeMyReport(
          type,
          {
            reportId: report.reportId,
            id: report.id,
            executionId: report.executionId,
            tableId: report.tableId,
          },
          services,
          userId,
        )
      } catch (cleanupError) {
        const meta = rawReport
          ? {
              id: rawReport.id ?? 'unknown',
              reportId: rawReport.reportId ?? 'unknown',
              tableId: rawReport.tableId ?? 'unknown',
              executionId: rawReport.executionId ?? 'unknown',
              loadType: rawReport.loadType as string,
            }
          : {}
        captureDprError(cleanupError, 'Failed to remove invalid report (list)', meta)
      }

      return null
    }),
  )

  const res = results.filter(Boolean) as (RequestedReport | RecentlyViewedReport)[]

  return res
}

/**
 * Add a report to my report
 * - validates the incoming report data before addition
 *
 * @param {('requested' | 'viewed')} type
 * @param {(RequestedReport | RecentlyViewedReport)} reportData
 * @param {Services} services
 * @param {string} userId
 */
export const addMyReport = async (
  type: 'requestedReports' | 'recentlyViewedReports' | 'subscriptions',
  reportData: RequestedReport | RecentlyViewedReport,
  services: Services,
  userId: string,
) => {
  const schema = getSchema(type)

  const result = schema.safeParse(reportData)

  if (!result.success) {
    captureDprError(result.error, 'Unable to add report - Invalid report data')

    return
  }

  switch (type) {
    case 'requestedReports':
      await services.requestedReportService.addReport(userId, result.data)
      break

    case 'recentlyViewedReports':
      await services.recentlyViewedService.setRecentlyViewed(result.data, userId)
      break

    case 'subscriptions':
      await services.subscriptionService.addReport(userId, result.data)
      break

    default:
      break
  }
}

/**
 * Removes a report from My Reports
 *
 * @param {('requested' | 'viewed')} type
 * @param {GetRemoveMyReportData} reportData
 * @param {Services} services
 * @param {string} userId
 * @return {*}  {Promise<void>}
 */
export const removeMyReport = async (
  type: 'requestedReports' | 'recentlyViewedReports' | 'subscriptions',
  reportData: GetRemoveMyReportData,
  services: Services,
  userId: string,
): Promise<void> => {
  const { executionId, tableId, reportId, id } = reportData

  if (executionId && type === 'requestedReports') {
    return services.requestedReportService.removeReport(executionId, userId)
  }

  if (type === 'recentlyViewedReports') {
    return services.recentlyViewedService.removeReport(userId, reportId, id, tableId)
  }

  if (type === 'subscriptions' && reportId && id) {
    return services.subscriptionService.removeReport(userId, reportId, id)
  }

  return undefined
}

/**
 * Fetches the reports from My reports
 *
 * @param {('requested' | 'viewed')} type
 * @param {GetRemoveMyReportData} reportData
 * @param {Services} services
 * @param {string} userId
 * @return {*}  {Promise<RequestedReport | RecentlyViewedReport | undefined>}
 */
const fetchReport = async (
  type: 'requestedReports' | 'recentlyViewedReports',
  reportData: GetRemoveMyReportData,
  services: Services,
  userId: string,
): Promise<RequestedReport | RecentlyViewedReport | undefined> => {
  const { executionId, tableId } = reportData

  const service = getService(type, services)

  if (executionId) {
    return service.getReportByExecutionId(executionId, userId)
  }

  if (tableId) {
    return service.getReportByTableId(tableId, userId)
  }

  return undefined
}

const getSchema = (type: 'requestedReports' | 'recentlyViewedReports' | 'subscriptions') => {
  const schemaMap = {
    requestedReports: RequestedReportSchema,
    recentlyViewedReports: ViewedReportSchema,
    subscriptions: ViewedReportSchema,
  } as const

  return schemaMap[type]
}

const getService = (type: 'requestedReports' | 'recentlyViewedReports' | 'subscriptions', services: Services) => {
  const serviceMap = {
    requestedReports: services.requestedReportService,
    recentlyViewedReports: services.recentlyViewedService,
    subscriptions: services.subscriptionService,
  } as const

  return serviceMap[type]
}
