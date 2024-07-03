import { AsyncReportData } from './AsyncReport'
import { RecentlyViewedReportData } from './RecentlyViewed'
import { BookmarkStoreData } from './Bookmark'

export interface UserStoreConfig {
  requestedReports: AsyncReportData[]
  recentlyViewedReports: RecentlyViewedReportData[]
  bookmarks: BookmarkStoreData[]
}
