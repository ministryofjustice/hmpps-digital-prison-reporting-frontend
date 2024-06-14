import { RequestStatus } from '../../types/AsyncReport'
import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'

const currentStatus = ''
export default {
  renderPolling: async ({ req, res, dataSources, asyncReportsStore, next }: AsyncReportUtilsParams) => {
    try {
      const { token } = res.locals.user || 'token'
      const { reportId, variantId, executionId } = req.params
      let reportData = await asyncReportsStore.getReport(executionId)

      const statusResponse = await dataSources.getAsyncReportStatus(token, reportId, variantId, executionId)
      const { status: latestStatus } = statusResponse

      if (currentStatus !== latestStatus) {
        await asyncReportsStore.updateStatus(reportData.executionId, latestStatus as RequestStatus)
        reportData = await asyncReportsStore.getReport(executionId)
      }

      return {
        pollingRenderData: {
          reportName: reportData.reportName,
          variantName: reportData.name,
          variantDescription: reportData.description,
          reportId,
          variantId,
          status: latestStatus,
          tableId: reportData.tableId,
          querySummary: reportData.query.summary,
          ...(reportData.url.report?.fullUrl && { reportUrl: reportData.url.report.fullUrl }),
        },
      }
    } catch (error) {
      next(error)
      return false
    }
  },
}
