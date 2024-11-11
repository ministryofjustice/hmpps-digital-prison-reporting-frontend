import MetricService from '../services/metricsService'

export type Services = UserStoreServices & {
  reportingService?: ReportingService
  metricService?: MetricService
  dashboardService?: DashboardService
}

export interface UserStoreServices {
  downloadPermissionService?: DownloadPermissionService
  requestedReportService?: RequestedReportService
  recentlyViewedService?: RecentlyViewedStoreService
  bookmarkService?: BookmarkService
}
