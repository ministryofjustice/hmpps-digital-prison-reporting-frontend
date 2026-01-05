import {
  BookmarkService,
  DefaultFilterValuesService,
  DownloadPermissionService,
  RecentlyViewedStoreService,
  RequestedReportService,
} from '../services'
import { ProductCollectionStoreService } from '../services/productCollection/productCollectionStoreService'
import MissingReportService from '../services/missingReport/missingReportService'
import ReportingService from '../services/reportingService'
import DashboardService from '../services/dashboardService'
import { ProductCollectionService } from '../services/productCollection/productCollectionService'
import { FeatureFlagService } from '../services/featureFlagService'

export type Services = UserStoreServices & {
  reportingService: ReportingService
  dashboardService: DashboardService
  missingReportService: MissingReportService
  productCollectionService: ProductCollectionService
  featureFlagService: FeatureFlagService
}

export interface UserStoreServices {
  downloadPermissionService: DownloadPermissionService
  requestedReportService: RequestedReportService
  recentlyViewedService: RecentlyViewedStoreService
  bookmarkService: BookmarkService
  defaultFilterValuesService: DefaultFilterValuesService
  productCollectionStoreService: ProductCollectionStoreService
}
