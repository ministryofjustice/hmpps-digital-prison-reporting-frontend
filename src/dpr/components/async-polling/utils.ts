import { AsyncReportData, RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import ReportingService from '../../services/reportingService'
import AsyncReportStoreService from '../../services/requestedReportsService'

const getStatus = async (
  token: string,
  reportId: string,
  variantId: string,
  executionId: string,
  currentStatus: RequestStatus,
  dataSources: ReportingService,
  asyncReportsStore: AsyncReportStoreService,
  dataProductDefinitionsPath: string,
): Promise<GetStatusUtilsResponse> => {
  let status: RequestStatus
  let errorMessage

  try {
    const statusResponse = await dataSources.getAsyncReportStatus(
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
    errorMessage = data.userMessage
    status = currentStatus === RequestStatus.FINISHED ? RequestStatus.EXPIRED : RequestStatus.FAILED
  }

  if (typeof status === 'number') status = RequestStatus.FAILED
  const res: GetStatusUtilsResponse = {
    status,
    ...(errorMessage && { errorMessage }),
  }

  if (currentStatus !== status) {
    await asyncReportsStore.updateStatus(executionId, status as RequestStatus, errorMessage)
    res.reportData = await asyncReportsStore.getReportByExecutionId(executionId)
  }

  return res
}

export const timeoutRequest = (requestTime: Date) => {
  if (!requestTime) return false
  const TIMEOUT_MINS_MAX = 15
  const today: Date = new Date()
  const requested: Date = new Date(requestTime)
  const diffMs = today.valueOf() - requested.valueOf()
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000)
  return diffMins >= TIMEOUT_MINS_MAX
}
interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage: string
  reportData?: AsyncReportData | undefined
}

export default {
  getStatus,
  renderPolling: async ({ req, res, dataSources, asyncReportsStore, next }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const { reportId, variantId, executionId } = req.params
    let reportData = await asyncReportsStore.getReportByExecutionId(executionId)

    let statusResponse
    if (timeoutRequest(reportData.timestamp.requested)) {
      statusResponse = {
        status: RequestStatus.FAILED,
        errorMessage: 'Request taking too long. Request Halted',
      }
    } else {
      statusResponse = await getStatus(
        token,
        reportId,
        variantId,
        executionId,
        reportData.status,
        dataSources,
        asyncReportsStore,
        reportData.dataProductDefinitionsPath,
      )
    }
    const { status, errorMessage } = statusResponse
    if (statusResponse.reportData) reportData = statusResponse.reportData

    return {
      pollingRenderData: {
        reportName: reportData.reportName,
        variantName: reportData.name,
        variantDescription: reportData.description,
        executionId,
        reportId,
        variantId,
        status,
        tableId: reportData.tableId,
        querySummary: reportData.query.summary,
        ...(reportData.url.report?.fullUrl && { reportUrl: reportData.url.report.fullUrl }),
        ...(reportData.url.request.fullUrl && { requestUrl: reportData.url.request.fullUrl }),
        ...(errorMessage && { errorMessage }),
      },
    }
  },
}
