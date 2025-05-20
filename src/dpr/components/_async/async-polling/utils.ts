import { ReportType } from '../../../types/UserReports'
import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import LocalsHelper from '../../../utils/localsHelper'

export default {
  renderPolling: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const { csrfToken, userId, definitionsPath: definitionPath } = LocalsHelper.getValues(res)
    const { reportId, variantId, executionId, id, type } = req.params

    const requestReportData = await services.requestedReportService.getReportByExecutionId(executionId, userId)

    const {
      reportName,
      name,
      variantName,
      description,
      status,
      query,
      timestamp,
      url,
      errorMessage,
      metrics,
      tableId,
    } = requestReportData

    const title = `${type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()} request status`

    return {
      title,
      pollingRenderData: {
        reportName,
        name: variantName || name,
        executionId,
        id: variantId || id,
        description,
        type: type || ReportType.REPORT,
        reportId,
        tableId,
        status,
        definitionPath,
        ...(query && { querySummary: query.summary }),
        requestedAt: timestamp.requested,
        csrfToken,
        ...(metrics && { metrics }),
        ...(url.report?.fullUrl && { reportUrl: url.report.fullUrl }),
        ...(url.request.fullUrl && { requestUrl: url.request.fullUrl }),
        ...(errorMessage && { errorMessage }),
      },
    }
  },
}
