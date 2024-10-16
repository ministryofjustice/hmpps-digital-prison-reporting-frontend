import { RecentlyViewedReportData } from '../../types/RecentlyViewed'

export default {
  filterReports: (report: RecentlyViewedReportData) => {
    return report.executionId.length !== 0
  },
}
