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
): Promise<GetStatusUtilsResponse> => {
  let status: RequestStatus
  let errorMessage

  try {
    const statusResponse = await dataSources.getAsyncReportStatus(token, reportId, variantId, executionId)
    status = statusResponse.status as RequestStatus

    if (typeof status !== 'string') {
      if (currentStatus === RequestStatus.FINISHED || !currentStatus) {
        status = RequestStatus.EXPIRED
      } else {
        throw new Error(statusResponse.userMessage)
      }
    } else if (status === RequestStatus.FAILED) {
      throw new Error(statusResponse.error)
    }
  } catch (error) {
    status = RequestStatus.FAILED
    errorMessage = error.message
  }

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

interface GetStatusUtilsResponse {
  status: RequestStatus
  errorMessage: string
  reportData?: AsyncReportData | undefined
}

export default {
  getStatus,
  renderPolling: async ({ req, res, dataSources, asyncReportsStore, next }: AsyncReportUtilsParams) => {
    try {
      const { token } = res.locals.user || 'token'
      const { reportId, variantId, executionId } = req.params
      let reportData = await asyncReportsStore.getReportByExecutionId(executionId)

      const statusResponse = await getStatus(
        token,
        reportId,
        variantId,
        executionId,
        reportData.status,
        dataSources,
        asyncReportsStore,
      )

      const { status, errorMessage } = statusResponse
      if (statusResponse.reportData) reportData = statusResponse.reportData

      return {
        pollingRenderData: {
          reportName: reportData.reportName,
          variantName: reportData.name,
          variantDescription: reportData.description,
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
    } catch (error) {
      next(error)
      return false
    }
  },
}
