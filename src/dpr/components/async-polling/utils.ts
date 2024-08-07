import { RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'

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
    const { reportId, variantId, executionId } = req.params

    const reportData = await services.asyncReportsStore.getReportByExecutionId(executionId)
    const { reportName, name, description, status, tableId, query, timestamp, url, errorMessage } = reportData

    return {
      pollingRenderData: {
        reportName,
        variantName: name,
        description,
        executionId,
        reportId,
        variantId,
        status,
        tableId,
        querySummary: query.summary,
        requestedAt: timestamp.requested,
        csrfToken,
        ...(url.report?.fullUrl && { reportUrl: url.report.fullUrl }),
        ...(url.request.fullUrl && { requestUrl: url.request.fullUrl }),
        ...(errorMessage && { errorMessage }),
      },
    }
  },
}
