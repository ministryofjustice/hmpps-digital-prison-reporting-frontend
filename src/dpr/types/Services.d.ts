import MissingReportClient from '../services/missingReport/missingReportClient'

export type Services = UserStoreServices & {
  reportingService: ReportingService
  dashboardService: DashboardService
  missingReportClient: MissingReportClient
}

export interface UserStoreServices {
  downloadPermissionService?: DownloadPermissionService
  requestedReportService?: RequestedReportService
  recentlyViewedService?: RecentlyViewedStoreService
  bookmarkService?: BookmarkService
  defaultFilterValuesService?: DefaultFilterValuesService
}
