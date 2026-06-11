import { Services } from 'src/dpr/types/Services'
import { RecentlyViewedReport, RequestedReport } from 'src/dpr/types/UserReports'
import { captureDprError } from 'src/dpr/utils/captureError'
import { RequestedReportSchema } from './requested-reports/validation'
import { ViewedReportSchema } from './recently-viewed/validation'

interface GetRemoveMyReportData {
  reportId: string
  id: string
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
  type: 'requested' | 'viewed',
  services: Services,
  userId: string,
): Promise<RequestedReport | RecentlyViewedReport | undefined> => {
  const rawReport = await fetchReport(type, reportData, services, userId)

  if (!rawReport) {
    return undefined
  }

  const schema = type === 'requested' ? RequestedReportSchema : ViewedReportSchema

  const result = schema.safeParse(rawReport)

  if (!result.success) {
    captureDprError(result.error, 'Invalid Redis payload')
    try {
      await removeMyReport(type, reportData, services, userId)
    } catch (cleanupError) {
      captureDprError(cleanupError, 'Failed to remove invalid report')
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
  type: 'requested' | 'viewed',
  services: Services,
  userId: string,
): Promise<(RequestedReport | RecentlyViewedReport)[]> => {
  const serviceMap = {
    requested: services.requestedReportService,
    viewed: services.recentlyViewedService,
  } as const

  const schemaMap = {
    requested: RequestedReportSchema,
    viewed: ViewedReportSchema,
  } as const

  const service = serviceMap[type]
  const schema = schemaMap[type]

  const reports: unknown[] =
    type === 'requested' ? await service.getAllReports(userId) : await service.getAllReports(userId)

  const results = await Promise.all(
    reports.map(async rawReport => {
      const result = schema.safeParse(rawReport)

      if (result.success) {
        return result.data
      }

      captureDprError(result.error, 'Invalid Redis payload (list)')

      try {
        const report = rawReport as Partial<GetRemoveMyReportData>

        if (report.reportId && report.id) {
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
        }
      } catch (cleanupError) {
        captureDprError(cleanupError, 'Failed to remove invalid report (list)')
      }

      return null
    }),
  )

  return results.filter(Boolean) as (RequestedReport | RecentlyViewedReport)[]
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
  type: 'requested' | 'viewed',
  reportData: RequestedReport | RecentlyViewedReport,
  services: Services,
  userId: string,
) => {
  const schema = type === 'requested' ? RequestedReportSchema : ViewedReportSchema

  const result = schema.safeParse(reportData)

  if (!result.success) {
    captureDprError(result.error, 'Unable to add report - Invalid report data')

    return
  }

  switch (type) {
    case 'requested':
      await services.requestedReportService.addReport(userId, result.data)
      break

    case 'viewed':
      await services.recentlyViewedService.setRecentlyViewed(result.data, userId)
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
 * @return {*}  {Promise<unknown>}
 */
export const removeMyReport = async (
  type: 'requested' | 'viewed',
  reportData: GetRemoveMyReportData,
  services: Services,
  userId: string,
): Promise<unknown> => {
  const { executionId, tableId, reportId, id } = reportData

  if (executionId && type === 'requested') {
    return services.requestedReportService.removeReport(executionId, userId)
  }

  if (tableId && type === 'viewed') {
    return services.recentlyViewedService.removeReport(userId, reportId, id, tableId)
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
 * @return {*}  {Promise<unknown>}
 */
const fetchReport = async (
  type: 'requested' | 'viewed',
  reportData: GetRemoveMyReportData,
  services: Services,
  userId: string,
): Promise<unknown> => {
  const { executionId, tableId } = reportData

  const serviceMap = {
    requested: services.requestedReportService,
    viewed: services.recentlyViewedService,
  } as const

  if (executionId) {
    return serviceMap[type].getReportByExecutionId(executionId, userId)
  }

  if (tableId) {
    return serviceMap[type].getReportByTableId(tableId, userId)
  }

  return undefined
}
