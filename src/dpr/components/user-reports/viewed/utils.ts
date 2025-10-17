import { RecentlyViewedReport, RequestStatus } from '../../../types/UserReports'

export const filterReports = (report: RecentlyViewedReport) => {
  return (
    report.status === RequestStatus.READY || (report.executionId?.length && report.status === RequestStatus.EXPIRED)
  )
}

export default {
  filterReports,
}
