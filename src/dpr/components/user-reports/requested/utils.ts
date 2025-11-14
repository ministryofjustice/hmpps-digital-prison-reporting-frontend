import { Response, Request } from 'express'
import { RequestStatus, UserReportData } from '../../../types/UserReports'
import { getStatus } from '../../../utils/requestStatusHelper'
import LocalsHelper from '../../../utils/localsHelper'
import { Services } from '../../../types/Services'

export const getRequestStatus = async ({ req, res, services }: { req: Request; res: Response; services: Services }) => {
  const { executionId, status: currentStatus } = req.body
  const { dprUser } = LocalsHelper.getValues(res)
  const response = await getStatus({ req, res, services })
  const errorMessage = response.errorMessage?.developerMessage || response.errorMessage?.userMessage

  if (currentStatus !== response.status) {
    await services.requestedReportService.updateStatus(
      executionId,
      dprUser.id,
      response.status as RequestStatus,
      errorMessage,
    )
    response.reportData = await services.requestedReportService.getReportByExecutionId(executionId, dprUser.id)
  }
  return response
}

export const filterReports = (report: UserReportData) => {
  return report.timestamp ? !report.timestamp.lastViewed : false
}

export default {
  getRequestStatus,
  filterReports,
}
