import { AsyncReportData } from './AsyncReport'
import { RecentlyViewedReportData } from './RecentlyViewed'
import { BookmarkedReportData } from './Bookmark'

export interface UserStoreConfig {
  requestedReports: AsyncReportData[]
  recentlyViewedReports: RecentlyViewedReportData[]
  bookmarks: BookmarkedReportData[]
}
