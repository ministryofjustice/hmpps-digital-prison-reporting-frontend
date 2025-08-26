import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import { RequestedReport, RequestStatus } from '../../../types/UserReports'
import { getStatus } from '../../../utils/requestStatusHelper'
import LocalsHelper from '../../../utils/localsHelper'

export default {
  getRequestStatus: async ({ req, res, services }: AsyncReportUtilsParams) => {
    const { executionId, status: currentStatus } = req.body
    const { dprUser } = LocalsHelper.getValues(res)
    const response = await getStatus({ req, res, services })

    if (currentStatus !== response.status) {
      await services.requestedReportService.updateStatus(
        executionId,
        dprUser.id,
        response.status as RequestStatus,
        response.errorMessage,
      )
      response.reportData = await services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)
    }
    return response
  },

  filterReports: (report: RequestedReport) => {
    return !report.timestamp.lastViewed
  },
}
