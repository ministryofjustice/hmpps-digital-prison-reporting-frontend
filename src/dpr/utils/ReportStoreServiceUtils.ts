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
import logger from './logger'
import { Services } from '../types/Services'
import MissingReportClient from '../services/missingReport/missingReportClient'

export interface InitDPRServicesArgs {
  reportingClient: ReportingClient
  dashboardClient: DashboardClient
  reportDataStore: ReportDataStore
  missingReportClient: MissingReportClient
}

interface dprServices {
  reportingService?: ReportingService
  dashboardService?: DashboardService
  requestedReportService?: RequestedReportService
  missingReportClient?: MissingReportClient
  recentlyViewedService?: RecentlyViewedStoreService
  bookmarkService?: BookmarkService
  downloadPermissionService?: DownloadPermissionService
  defaultFilterValuesService?: DefaultFilterValuesService
}

const createDprServices = (clients: InitDPRServicesArgs, reportStoreConfig: ReportStoreConfig = {}): Services => {
  logger.info('Creating DPR services...')

  const { reportingClient, dashboardClient, reportDataStore } = clients
  let services: dprServices = {}

  if (reportingClient) {
    services = createReportingService(services, reportingClient)
  }

  if (dashboardClient) {
    services = createDashboardService(services, dashboardClient)
  }

  if (reportDataStore) {
    services = createReportStoreServices(reportDataStore, services, reportStoreConfig)
  }

  services = {
    ...services,
    missingReportClient: clients.missingReportClient,
  }

  return services as Services
}

const createReportingService = (services: dprServices, client: ReportingClient) => {
  services = {
    ...services,
    reportingService: new ReportingService(client),
  }

  return services
}

const createDashboardService = (services: dprServices, client: DashboardClient) => {
  services = {
    ...services,
    dashboardService: new DashboardService(client),
  }

  return services
}

interface ReportStoreConfig {
  bookmarking?: boolean
  download?: boolean
}

const createReportStoreServices = (
  reportDataStore: ReportDataStore,
  services: dprServices,
  config: ReportStoreConfig = {},
) => {
  services = {
    ...services,
    requestedReportService: new RequestedReportService(reportDataStore),
    recentlyViewedService: new RecentlyViewedStoreService(reportDataStore),
    defaultFilterValuesService: new DefaultFilterValuesService(reportDataStore),
  }

  if (config.bookmarking === undefined || config.bookmarking) {
    services = createBookmarkService(services, reportDataStore)
  } else {
    logger.info('Service Disabled: BookmarkService')
  }

  if (config.download === undefined || config.download) {
    services = createDownloadService(services, reportDataStore)
  } else {
    logger.info('Service Disabled: DownloadPermissionService')
  }

  return services
}

const createDownloadService = (services: dprServices, reportDataStore: ReportDataStore) => {
  services = {
    ...services,
    downloadPermissionService: new DownloadPermissionService(reportDataStore),
  }

  return services
}

const createBookmarkService = (services: dprServices, reportDataStore: ReportDataStore) => {
  services = {
    ...services,
    bookmarkService: new BookmarkService(reportDataStore),
  }

  return services
}

export default createDprServices
