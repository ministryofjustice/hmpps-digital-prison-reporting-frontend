/* eslint-disable no-param-reassign */
import {
  DownloadPermissionService,
  BookmarkService,
  RequestedReportService,
  RecentlyViewedStoreService,
  ReportingService,
  DashboardService,
  DefaultFilterValuesService,
} from '../services'
import ReportDataStore from '../data/reportDataStore'
import ReportingClient from '../data/reportingClient'
import DashboardClient from '../data/dashboardClient'
import MissingReportClient from '../data/missingReportClient'
import ProductCollectionClient from '../data/productCollectionClient'
import logger from './logger'
import { Services } from '../types/Services'
import { MissingReportService } from '../services/missingReport/missingReportService'
import { ProductCollectionStoreService } from '../services/productCollection/productCollectionStoreService'
import { ProductCollectionService } from '../services/productCollection/productCollectionService'
import { ServiceFeatureConfig } from '../types/DprConfig'

export interface InitDPRServicesArgs {
  reportingClient: ReportingClient
  dashboardClient: DashboardClient
  reportDataStore: ReportDataStore
  missingReportClient: MissingReportClient
  productCollectionClient: ProductCollectionClient
}

interface dprServices {
  reportingService: ReportingService
  dashboardService: DashboardService
  productCollectionService: ProductCollectionService
  requestedReportService: RequestedReportService
  missingReportService: MissingReportService
  recentlyViewedService: RecentlyViewedStoreService
  bookmarkService: BookmarkService
  downloadPermissionService: DownloadPermissionService
  defaultFilterValuesService: DefaultFilterValuesService
  productCollectionStoreService: ProductCollectionStoreService
}

export const createDprServices = (
  clients: InitDPRServicesArgs,
  serviceFeatureConfig: ServiceFeatureConfig = {
    bookmarking: false,
    download: false,
    collections: false,
    missingReports: false,
    saveDefaults: false,
  },
): Services => {
  logger.info('Creating DPR services...')

  const { reportingClient, dashboardClient, reportDataStore, missingReportClient, productCollectionClient } = clients
  const services: dprServices = {
    reportingService: new ReportingService(reportingClient),
    dashboardService: new DashboardService(dashboardClient),

    requestedReportService: new RequestedReportService(reportDataStore),
    recentlyViewedService: new RecentlyViewedStoreService(reportDataStore),
    bookmarkService: new BookmarkService(reportDataStore, serviceFeatureConfig),

    defaultFilterValuesService: new DefaultFilterValuesService(reportDataStore, serviceFeatureConfig),
    productCollectionStoreService: new ProductCollectionStoreService(reportDataStore, serviceFeatureConfig),
    downloadPermissionService: new DownloadPermissionService(reportDataStore, serviceFeatureConfig),

    missingReportService: new MissingReportService(missingReportClient, serviceFeatureConfig),
    productCollectionService: new ProductCollectionService(productCollectionClient, serviceFeatureConfig),
  }

  return services as Services
}

export default createDprServices
