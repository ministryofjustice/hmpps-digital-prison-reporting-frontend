import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { RequestedReport, RequestStatus } from '../../types/UserReports'
import { getStatus } from '../../utils/reportStatusHelper'

export default {
  getRequestStatus: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const { executionId, status: currentStatus } = req.body
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
    const response = await getStatus({ req, res, services })

    if (currentStatus !== response.status) {
      await services.requestedReportService.updateStatus(
        executionId,
        userId,
        response.status as RequestStatus,
        response.errorMessage,
      )
      response.reportData = await services.requestedReportService.getReportByExecutionId(executionId, userId)
    }

    return response
  },

  filterReports: (report: RequestedReport) => {
    return !report.timestamp.lastViewed
  },
}
