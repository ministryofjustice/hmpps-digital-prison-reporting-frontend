import { ReportType } from '../../types/UserReports'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'

export default {
  renderPolling: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    const { dataProductDefinitionsPath: definitionPath } = req.query
    const { reportId, variantId, executionId, id, type } = req.params

    const requestReportData = await services.requestedReportService.getReportByExecutionId(executionId, userId)

    const { reportName, name, variantName, description, status, query, timestamp, url, errorMessage } =
      requestReportData

    return {
      pollingRenderData: {
        reportName,
        name: variantName || name,
        executionId,
        id: variantId || id,
        description,
        type: type || ReportType.REPORT,
        reportId,
        status,
        definitionPath,
        ...(query && { querySummary: query.summary }),
        requestedAt: timestamp.requested,
        csrfToken,
        ...(url.report?.fullUrl && { reportUrl: url.report.fullUrl }),
        ...(url.request.fullUrl && { requestUrl: url.request.fullUrl }),
        ...(errorMessage && { errorMessage }),
      },
    }
  },
}
