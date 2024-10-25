import MetricService from '../services/metricsService'

export interface Services {
  requestedReportService: RequestedReportService
  recentlyViewedService: RecentlyViewedStoreService
  bookmarkService: BookmarkService
  reportingService: ReportingService
  metricService: MetricService
  dashboardService: DashboardService
}
