import { BookmarkStoreData } from './Bookmark'
import { DownloadPermissionConfig } from './Download'
import { RequestedReport, RecentlyViewedReport } from './UserReports'

export interface ReportStoreConfig {
  requestedReports: RequestedReport[]
  recentlyViewedReports: RecentlyViewedReport[]
  bookmarks: BookmarkStoreData[]
  downloadPermissions?: DownloadPermissionConfig[]
}
