import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'
import { Request, Response } from 'express'
import { ReportType, RequestedReport, RequestStatus } from '../types/UserReports'
import { ChildReportExecutionData } from '../types/ExecutionData'
import logger from './logger'
import { Services } from '../types/Services'
import localsHelper from './localsHelper'
import { components } from '../types/api'
import ErrorHandler from './ErrorHandler'

dayjs.extend(customParse)
interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage?: { userMessage?: string; developerMessage?: string }
  reportData?: RequestedReport | undefined
}

const BAD_REQUEST_STATUSES: Array<RequestStatus> = [RequestStatus.ABORTED, RequestStatus.FAILED, RequestStatus.EXPIRED]

const IN_PROGRESS_REQUEST_STATUSES: Array<RequestStatus> = [
  RequestStatus.SUBMITTED,
  RequestStatus.STARTED,
  RequestStatus.PICKED,
]

function findWorstStatusResponse(
  statusRequests: Array<Promise<components['schemas']['StatementExecutionStatus']>>,
): Promise<components['schemas']['StatementExecutionStatus']> {
  return Promise.all(statusRequests).then((statusResponses) => {
    const badStatus = statusResponses.find(
      (response) =>
        typeof response.status === 'number' || BAD_REQUEST_STATUSES.includes(response.status as RequestStatus),
    )

    if (badStatus) {
      return badStatus
    }

    const inProgressStatus = statusResponses.find((response) =>
      IN_PROGRESS_REQUEST_STATUSES.includes(response.status as RequestStatus),
    )

    if (inProgressStatus) {
      return inProgressStatus
    }

    return statusResponses[0]
  })
}

const getStatusByReportType = async (
  services: Services,
  req: Request,
  res: Response,
  token: string,
  userId: string,
) => {
  const { definitionsPath } = localsHelper.getValues(res)
  const { type, reportId, executionId, id, tableId } = req.body

  const requestedReport = await services.requestedReportService.getReportByExecutionId(executionId, userId)

  const reports = requestedReport?.childExecutionData ?? []

  let statusRequests: Array<Promise<components['schemas']['StatementExecutionStatus']>> = []
  if (type === ReportType.REPORT) {
    reports.push({ executionId, tableId, variantId: id })
    statusRequests = reports.map((executionData: ChildReportExecutionData) => {
      return services.reportingService.getAsyncReportStatus(
        token,
        reportId,
        executionData.variantId,
        executionData.executionId || '',
        definitionsPath,
        executionData.tableId || '',
      )
    })
  }

  if (type === ReportType.DASHBOARD) {
    statusRequests.push(
      services.dashboardService.getAsyncStatus(token, reportId, id, executionId, tableId, definitionsPath),
    )
  }

  const statusResponse = await findWorstStatusResponse(statusRequests)

  return {
    status: statusResponse.status,
    statusResponse,
  }
}

export const getStatus = async ({
  req,
  res,
  services,
}: {
  req: Request
  res: Response
  services: Services
}): Promise<GetStatusUtilsResponse> => {
  const { token, dprUser } = localsHelper.getValues(res)
  const { status: currentStatus, requestedAt } = req.body
  const timeoutExemptStatuses = [RequestStatus.READY, RequestStatus.EXPIRED, RequestStatus.FAILED]

  let status: RequestStatus
  let errorMessage
  let statusResponse: components['schemas']['StatementExecutionStatus']
  try {
    const statusResponseData = await getStatusByReportType(services, req, res, token, dprUser.id)
    statusResponse = statusResponseData.statusResponse
    status = <RequestStatus>statusResponseData.status
    if (
      shouldTimeoutRequest({ requestedAt, compareTime: new Date(), durationMins: 15 }) &&
      !timeoutExemptStatuses.includes(<RequestStatus>status)
    ) {
      throw new Error('Request taking too long. Request Halted')
    }

    if (status === RequestStatus.FAILED) {
      logger.error(`Error: ${JSON.stringify(statusResponse.error)}`)
      errorMessage = new ErrorHandler(statusResponse.error).formatError()
    }
  } catch (error) {
    errorMessage = new ErrorHandler(error).formatError()
    status = currentStatus === RequestStatus.FINISHED ? RequestStatus.EXPIRED : RequestStatus.FAILED
  }

  if (typeof status === 'number') {
    status = RequestStatus.FAILED
  }

  return {
    status,
    ...(errorMessage && { errorMessage }),
  }
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
export const getExpiredStatus = async ({ req, res, services }: { req: Request; res: Response; services: Services }) => {
  const { token, dprUser } = localsHelper.getValues(res)
  const { executionId, status: currentStatus } = req.body

  let errorMessage
  let status
  try {
    const statusData = await getStatusByReportType(services, req, res, token, dprUser.id)
    status = <RequestStatus>statusData.status
  } catch (error) {
    errorMessage = new ErrorHandler(error).formatError()
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
