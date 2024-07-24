import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'

interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage?: string
  reportData?: AsyncReportData | undefined
}

export const getStatus = async ({ req, res, services }: AsyncReportUtilsParams): Promise<GetStatusUtilsResponse> => {
  let errorMessage
  let status
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, variantId, executionId, status: currentStatus, dataProductDefinitionsPath, requestedAt } = req.body

  try {
    const timeoutExemptStatuses = [RequestStatus.READY, RequestStatus.EXPIRED, RequestStatus.FAILED]
    const statusResponse = await services.reportingService.getAsyncReportStatus(
      token,
      reportId,
      variantId,
      executionId,
      dataProductDefinitionsPath,
    )
    status = statusResponse.status as RequestStatus

    if (timeoutRequest(requestedAt) && !timeoutExemptStatuses.includes(status)) {
      throw new Error('Request taking too long. Request Halted')
    }

    if (status === RequestStatus.FAILED) {
      errorMessage = statusResponse.error
    }
  } catch (error) {
    const { data } = error
    errorMessage = data ? data.userMessage : error.message
    status = currentStatus === RequestStatus.FINISHED ? RequestStatus.EXPIRED : RequestStatus.FAILED
  }

  if (typeof status === 'number') {
    status = RequestStatus.FAILED
  }

  const result: GetStatusUtilsResponse = {
    status,
    ...(errorMessage && { errorMessage }),
  }

  return result
}

/**
 * Gets the expired status of a viewed report
 * - if reports status was READY/FINISHED
 * - And the new Status is an error status
 * - it means the report has expired
 *
 * @param {AsyncReportUtilsParams} { req, res, services }
 * @return {*}
 */
export const getExpiredStatus = async ({ req, res, services }: AsyncReportUtilsParams) => {
  let errorMessage
  let status
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, variantId, executionId, status: currentStatus, dataProductDefinitionsPath } = req.body

  try {
    const statusResponse = await services.reportingService.getAsyncReportStatus(
      token,
      reportId,
      variantId,
      executionId,
      dataProductDefinitionsPath,
    )
    status = statusResponse.status as RequestStatus
  } catch (error) {
    const { data } = error
    errorMessage = (data ?? {}).userMessage
    status = currentStatus === RequestStatus.FINISHED ? RequestStatus.EXPIRED : RequestStatus.FAILED
  }

  const result: GetStatusUtilsResponse = {
    status,
    ...(errorMessage && { errorMessage }),
  }

  return {
    isExpired: result.status === RequestStatus.EXPIRED,
    executionId,
  }
}

const timeoutRequest = (requestTime: Date) => {
  if (!requestTime) return false
  const TIMEOUT_MINS_MAX = 15
  const today: Date = new Date()
  const requested: Date = new Date(requestTime)
  const diffMs = today.valueOf() - requested.valueOf()
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
  const res = diffMins >= TIMEOUT_MINS_MAX
  return res
}

export default {
  getStatus,
  getExpiredStatus,
  timeoutRequest,
}
