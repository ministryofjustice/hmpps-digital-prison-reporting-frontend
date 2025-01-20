import dayjs from 'dayjs'
import { Request } from 'express'
import { ReportType, RequestedReport, RequestStatus } from '../types/UserReports'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'
import logger from './logger'
import { Services } from '../types/Services'

interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage?: string
  reportData?: RequestedReport | undefined
}

const getStatusByReportType = async (services: Services, req: Request, token: string) => {
  const { type, reportId, executionId, dataProductDefinitionsPath, id, tableId } = req.body
  let statusResponse
  let status

  if (type === ReportType.REPORT) {
    statusResponse = await services.reportingService.getAsyncReportStatus(
      token,
      reportId,
      id,
      executionId,
      dataProductDefinitionsPath,
      tableId,
    )
    status = statusResponse.status as RequestStatus
  }

  if (type === ReportType.DASHBOARD) {
    statusResponse = await services.dashboardService.getAsyncStatus(
      token,
      reportId,
      id,
      executionId,
      dataProductDefinitionsPath,
      tableId,
    )
    status = statusResponse.status as RequestStatus
  }

  return {
    status,
    statusResponse,
  }
}

export const getStatus = async ({ req, res, services }: AsyncReportUtilsParams): Promise<GetStatusUtilsResponse> => {
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { status: currentStatus, requestedAt } = req.body
  const timeoutExemptStatuses = [RequestStatus.READY, RequestStatus.EXPIRED, RequestStatus.FAILED]

  let status
  let errorMessage
  let statusResponse
  try {
    ;({ status, statusResponse } = await getStatusByReportType(services, req, token))
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
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { executionId, status: currentStatus } = req.body

  let errorMessage
  let status
  try {
    ;({ status } = await getStatusByReportType(services, req, token))
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
