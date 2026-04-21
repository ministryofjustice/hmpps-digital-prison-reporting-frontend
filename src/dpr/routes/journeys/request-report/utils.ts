import { ReportType, RequestStatus } from '../../../types/UserReports'
import { DashboardService, ReportingService } from '../../../services'
import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import LocalsHelper from '../../../utils/localsHelper'

export const cancelRequest = async ({ req, res, services }: AsyncReportUtilsParams) => {
  const { token, dprUser, definitionsPath } = LocalsHelper.getValues(res)
  const { reportId, id, executionId, type } = req.params

  let service: ReportingService | DashboardService = services.reportingService
  if (type === ReportType.REPORT) service = services.reportingService
  if (type === ReportType.DASHBOARD) service = services.dashboardService

  const response = await service.cancelAsyncRequest(
    token,
    reportId as string,
    id as string,
    executionId as string,
    definitionsPath,
  )

  if (response && response['cancellationSucceeded']) {
    await services.requestedReportService.updateStatus(executionId as string, dprUser.id, RequestStatus.ABORTED)
  }
}
