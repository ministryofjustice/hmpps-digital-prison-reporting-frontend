import dayjs from 'dayjs'
import { RequestedReport, RequestStatus } from '../types/UserReports'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import logger from './logger'

interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage?: string
  reportData?: RequestedReport | undefined
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
      logger.error(`Error: ${JSON.stringify(statusResponse.error)}`)
      const { userMessage, developerMessage } = statusResponse.error
      if (userMessage || developerMessage) {
        errorMessage = statusResponse.error
      } else {
        errorMessage = {
          developerMessage: statusResponse.error,
        }
      }
    }
  } catch (error) {
    logger.error(`Error: ${JSON.stringify(error)}`)
    const { data } = error
    errorMessage = data || { userMessage: error.message }
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
    status =
      currentStatus === RequestStatus.READY || currentStatus === RequestStatus.FINISHED
        ? RequestStatus.EXPIRED
        : RequestStatus.FAILED
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
  const compareDate = dayjs(compareTime)
  const requestDate = dayjs(requestedAt)

  const result = compareDate.diff(requestDate, 'minutes')

  return result >= durationMins
}

export default {
  getStatus,
  getExpiredStatus,
  shouldTimeoutRequest,
}
