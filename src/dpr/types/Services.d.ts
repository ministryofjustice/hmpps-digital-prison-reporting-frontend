import {
  BookmarkService,
  DashboardService,
  DefaultFilterValuesService,
  DownloadPermissionService,
  RecentlyViewedStoreService,
  ReportingService,
  RequestedReportService,
} from '../services'
import { ProductCollectionStoreService } from '../services/productCollection/productCollectionStoreService'
import MissingReportService from '../services/missingReport/missingReportService'
import ReportingService from '../services/reportingService'
import DashboardService from '../services/dashboardService'
import { ProductCollectionService } from '../services/productCollection/productCollectionService'

export type Services = UserStoreServices & {
  reportingService: ReportingService
  dashboardService: DashboardService
  missingReportService: MissingReportService
  productCollectionService: ProductCollectionService
}

export interface UserStoreServices {
  downloadPermissionService: DownloadPermissionService
  requestedReportService: RequestedReportService
  recentlyViewedService: RecentlyViewedStoreService
  bookmarkService: BookmarkService
  defaultFilterValuesService: DefaultFilterValuesService
  productCollectionStoreService: ProductCollectionStoreService
}
