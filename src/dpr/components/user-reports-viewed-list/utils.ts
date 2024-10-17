import { RecentlyViewedReport } from '../../types/UserReports'

export default {
  filterReports: (report: RecentlyViewedReport) => {
    return report.executionId.length !== 0
  },
}
