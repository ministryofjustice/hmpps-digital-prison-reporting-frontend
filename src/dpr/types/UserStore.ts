import { AsyncReportData } from './AsyncReport'
import { RecentlyViewedReportData } from './RecentlyViewed'

export interface UserStoreConfig {
  requestedReports: AsyncReportData[]
  recentlyViewedReports: RecentlyViewedReportData[]
  bookmarks: []
}
