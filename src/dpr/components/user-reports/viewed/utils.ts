import { RequestStatus, UserReportData } from '../../../types/UserReports'

export const filterReports = (report: UserReportData) => {
  return Boolean(
    report.status === RequestStatus.READY ||
      Boolean(report.executionId?.length && report.status === RequestStatus.EXPIRED),
  )
}

export default {
  filterReports,
}
