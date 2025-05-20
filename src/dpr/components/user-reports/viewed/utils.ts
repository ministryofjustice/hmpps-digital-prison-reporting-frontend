import { RecentlyViewedReport, RequestStatus } from '../../../types/UserReports'

export default {
  filterReports: (report: RecentlyViewedReport) => {
    return (
      report.status === RequestStatus.READY || (report.executionId?.length && report.status === RequestStatus.EXPIRED)
    )
  },
}
