import { BookmarkStoreData } from './Bookmark'
import { RequestedReport, RecentlyViewedReport } from './UserReports'

export interface UserStoreConfig {
  requestedReports: RequestedReport[]
  recentlyViewedReports: RecentlyViewedReport[]
  bookmarks: BookmarkStoreData[]
}
