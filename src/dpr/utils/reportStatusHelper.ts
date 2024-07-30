import moment from 'moment'
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

    if (
      shouldTimeoutRequest({ requestedAt, compareTime: new Date(), durationMins: 15 }) &&
      !timeoutExemptStatuses.includes(status)
    ) {
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
    status = currentStatus === RequestStatus.READY ? RequestStatus.EXPIRED : RequestStatus.FAILED
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

export const shouldTimeoutRequest = ({
  requestedAt,
  compareTime,
  durationMins,
}: {
  requestedAt: Date
  compareTime: Date
  durationMins: number
}) => {
  const compareDate = moment(compareTime)
  const requestDate = moment(requestedAt)

  const result = compareDate.diff(requestDate, 'minutes')

  return result >= durationMins
}

export default {
  getStatus,
  getExpiredStatus,
  shouldTimeoutRequest,
}
