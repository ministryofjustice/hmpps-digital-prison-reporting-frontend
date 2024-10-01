import { RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'

export default {
  cancelRequest: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const token = res.locals.user?.token ? res.locals.user.token : 'token'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { reportId, variantId, executionId } = req.body

    const response = await services.reportingService.cancelAsyncRequest(token, reportId, variantId, executionId)
    if (response && response.cancellationSucceeded) {
      await services.asyncReportsStore.updateStatus(executionId, userId, RequestStatus.ABORTED)
    }
  },

  renderPolling: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const { dataProductDefinitionsPath: definitionPath } = req.query
    const { reportId, variantId, executionId } = req.params

    const reportData = await services.asyncReportsStore.getReportByExecutionId(executionId, userId)
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
        definitionPath,
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
