import { ReportType } from '../../../../types/UserReports'
import { AsyncReportUtilsParams } from '../../../../types/AsyncReportUtils'
import LocalsHelper from '../../../../utils/localsHelper'

export const renderPolling = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { csrfToken, dprUser, definitionsPath: definitionPath } = LocalsHelper.getValues(res)
  const { reportId, variantId, executionId, id, type } = req.params

  const requestReportData = await services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)

  const title = `${type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()} request status`
  const errorMessage = requestReportData?.errorMessage ? JSON.parse(requestReportData?.errorMessage) : undefined

  return {
    title,
    pollingRenderData: {
      reportName: requestReportData?.reportName || '',
      name: requestReportData?.variantName || requestReportData?.name || '',
      executionId,
      id: variantId || id,
      description: requestReportData?.description || '',
      type: type || ReportType.REPORT,
      reportId,
      tableId: requestReportData?.tableId,
      status: requestReportData?.status,
      definitionPath,
      pollingUrl: req.baseUrl,
      ...(requestReportData?.query && { querySummary: requestReportData.query.summary }),
      requestedAt: requestReportData?.timestamp.requested,
      csrfToken,
      ...(requestReportData?.url?.report?.fullUrl && { reportUrl: requestReportData.url.report.fullUrl }),
      ...(requestReportData?.url?.request?.fullUrl && { requestUrl: requestReportData.url.request.fullUrl }),
      ...(errorMessage && { errorMessage }),
    },
  }
}

export default {
  renderPolling,
}
