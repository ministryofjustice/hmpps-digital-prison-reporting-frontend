import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import { AsyncReportUtilsParams } from '../types/AsyncReportUtils'

interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage?: string
  reportData?: AsyncReportData | undefined
}

const getStatus = async ({ req, res, services }: AsyncReportUtilsParams): Promise<GetStatusUtilsResponse> => {
  let errorMessage
  let status
  const token = res.locals.user?.token ? res.locals.user.token : 'token'
  const { reportId, variantId, executionId, status: currentStatus, dataProductDefinitionsPath, requestedAt } = req.body

  try {
    if (timeoutRequest(requestedAt) && currentStatus !== RequestStatus.READY) {
      throw new Error('Request taking too long. Request Halted')
    }

    const statusResponse = await services.reportingService.getAsyncReportStatus(
      token,
      reportId,
      variantId,
      executionId,
      dataProductDefinitionsPath,
    )
    status = statusResponse.status as RequestStatus

    if (status === RequestStatus.FAILED) {
      errorMessage = statusResponse.error
    }
  } catch (error) {
    const { data } = error
    errorMessage = (data ?? {}).userMessage
    status = currentStatus === RequestStatus.FINISHED ? RequestStatus.EXPIRED : RequestStatus.FAILED
  }

  if (typeof status === 'number') {
    status = RequestStatus.FAILED
  }

  const result: GetStatusUtilsResponse = {
    status,
    ...(errorMessage && { errorMessage }),
  }

  if (currentStatus !== status) {
    await services.asyncReportsStore.updateStatus(executionId, status as RequestStatus, errorMessage)
    result.reportData = await services.asyncReportsStore.getReportByExecutionId(executionId)
  }

  return result
}

const getExpiredStatus = async ({ req, res, services }: AsyncReportUtilsParams) => {
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

  if (currentStatus !== status) {
    await services.asyncReportsStore.updateStatus(executionId, status as RequestStatus)
    result.reportData = await services.asyncReportsStore.getReportByExecutionId(executionId)
  }

  return result
}

const timeoutRequest = (requestTime: Date) => {
  if (!requestTime) return false
  const TIMEOUT_MINS_MAX = 15
  const today: Date = new Date()
  const requested: Date = new Date(requestTime)
  const diffMs = today.valueOf() - requested.valueOf()
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
  return diffMins >= TIMEOUT_MINS_MAX
}

export default {
  getStatus,
  getExpiredStatus,
  timeoutRequest,
}
