import { BookmarkStoreData } from './Bookmark'
import { DownloadPermissionConfig } from './Download'
import { RequestedReport, RecentlyViewedReport } from './UserReports'

export interface UserStoreConfig {
  requestedReports: RequestedReport[]
  recentlyViewedReports: RecentlyViewedReport[]
  bookmarks: BookmarkStoreData[]
  downloadPermissions: DownloadPermissionConfig[]
}
