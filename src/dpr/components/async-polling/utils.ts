import { RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import ReportStatusUtils from '../../utils/reportStatusUtils'

export default {
  cancelRequest: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const { reportId, variantId, executionId } = req.body
    const response = await services.reportingService.cancelAsyncRequest(token, reportId, variantId, executionId)
    if (response && response.cancellationSucceeded) {
      await services.asyncReportsStore.updateStatus(executionId, RequestStatus.ABORTED)
    }
  },

  renderPolling: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const { reportId, variantId, executionId } = req.params
    let reportData = await services.asyncReportsStore.getReportByExecutionId(executionId)
    let statusResponse
    if (ReportStatusUtils.timeoutRequest(reportData.timestamp.requested)) {
      statusResponse = {
        status: RequestStatus.FAILED,
        errorMessage: 'Request taking too long. Request Halted',
      }
    } else if (reportData.status === RequestStatus.FAILED) {
      statusResponse = {
        status: RequestStatus.FAILED,
        errorMessage: reportData.errorMessage,
      }
    } else if (reportData.status === RequestStatus.ABORTED) {
      statusResponse = {
        status: RequestStatus.ABORTED,
      }
    } else {
      statusResponse = await ReportStatusUtils.getStatus(
        token,
        reportId,
        variantId,
        executionId,
        reportData.status,
        services,
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
        csrfToken,
        ...(reportData.url.report?.fullUrl && { reportUrl: reportData.url.report.fullUrl }),
        ...(reportData.url.request.fullUrl && { requestUrl: reportData.url.request.fullUrl }),
        ...(errorMessage && { errorMessage }),
      },
    }
  },
}
