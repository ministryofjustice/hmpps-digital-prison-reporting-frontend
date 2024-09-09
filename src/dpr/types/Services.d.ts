import MetricService from '../services/metricsService'

export interface Services {
  asyncReportsStore: AsyncReportStoreService
  recentlyViewedStoreService: RecentlyViewedStoreService
  bookmarkService: BookmarkService
  reportingService: ReportingService
  metricService: MetricService
  dashboardService: DashboardService
}
