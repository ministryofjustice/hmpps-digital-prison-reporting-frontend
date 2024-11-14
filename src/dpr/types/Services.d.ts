export type Services = UserStoreServices & {
  reportingService: ReportingService
  dashboardService: DashboardService
}

export interface UserStoreServices {
  downloadPermissionService?: DownloadPermissionService
  requestedReportService?: RequestedReportService
  recentlyViewedService?: RecentlyViewedStoreService
  bookmarkService?: BookmarkService
}
