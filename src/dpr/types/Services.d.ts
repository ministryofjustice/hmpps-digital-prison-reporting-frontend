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
import MissingReportClient from '../services/missingReport/missingReportClient'
import ReportingService from '../services/reportingService'
import DashboardService from '../services/dashboardService'
import { ProductCollectionService } from '../services/productCollection/productCollectionService'

export type Services = UserStoreServices & {
  reportingService: ReportingService
  dashboardService: DashboardService
  missingReportClient: MissingReportClient
  productCollectionService: ProductCollectionService
}

export interface UserStoreServices {
  downloadPermissionService?: DownloadPermissionService
  requestedReportService?: RequestedReportService
  recentlyViewedService?: RecentlyViewedStoreService
  bookmarkService?: BookmarkService
  defaultFilterValuesService?: DefaultFilterValuesService
  productCollectionStoreService?: ProductCollectionStoreService
}
