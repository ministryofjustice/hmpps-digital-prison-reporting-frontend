import { Services } from 'src/dpr/types/Services'
import { RecentlyViewedReport, RequestedReport } from 'src/dpr/types/UserReports'
import { captureDprError } from 'src/dpr/utils/captureError'
import { RequestedReportSchema } from './requested-reports/validation'
import { ViewedReportSchema } from './recently-viewed/validation'

interface GetRemoveMyReportData {
  reportId: string
  id: string
  executionId?: string
  tableId?: string
}

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
