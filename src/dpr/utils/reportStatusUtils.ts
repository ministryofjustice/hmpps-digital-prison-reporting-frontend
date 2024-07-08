import { AsyncReportData, RequestStatus } from '../types/AsyncReport'
import { Services } from '../types/Services'

interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage?: string
  reportData?: AsyncReportData | undefined
}

export default {
  getStatus: async (
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
    currentStatus: RequestStatus,
    services: Services,
    dataProductDefinitionsPath: string,
  ): Promise<GetStatusUtilsResponse> => {
    let status: RequestStatus
    let errorMessage
    try {
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
      errorMessage =  (data ?? {}).userMessage
      status = currentStatus === RequestStatus.FINISHED ? RequestStatus.EXPIRED : RequestStatus.FAILED
    }

    if (typeof status === 'number') status = RequestStatus.FAILED
    const res: GetStatusUtilsResponse = {
      status,
      ...(errorMessage && { errorMessage }),
    }

    if (currentStatus !== status) {
      await services.asyncReportsStore.updateStatus(executionId, status as RequestStatus, errorMessage)
      res.reportData = await services.asyncReportsStore.getReportByExecutionId(executionId)
    }

    return res
  },

  timeoutRequest: (requestTime: Date) => {
    if (!requestTime) return false
    const TIMEOUT_MINS_MAX = 15
    const today: Date = new Date()
    const requested: Date = new Date(requestTime)
    const diffMs = today.valueOf() - requested.valueOf()
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
    return diffMins >= TIMEOUT_MINS_MAX
  },
}
