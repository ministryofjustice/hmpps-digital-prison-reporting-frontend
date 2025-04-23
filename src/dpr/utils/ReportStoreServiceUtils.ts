/* eslint-disable no-param-reassign */
import RequestedReportService from '../services/requestedReportService'
import RecentlyViewedStoreService from '../services/recentlyViewedService'
import BookmarkService from '../services/bookmarkService'
import DownloadPermissionService from '../services/downloadPermissionService'
import ReportDataStore from '../data/reportDataStore'
import { Services } from '../types/Services'

import ReportingService from '../services/reportingService'
import DashboardService from '../services/dashboardService'
import ReportingClient from '../data/reportingClient'
import DashboardClient from '../data/dashboardClient'
import logger from './logger'

export const initReportStoreServices = async (userId: string, services: Services) => {
  if (!services.requestedReportService.isInitialised()) {
    logger.info('Initialising service: requestedReportService')
    await services.requestedReportService.init(userId)
  }

  if (!services.recentlyViewedService.isInitialised()) {
    logger.info('Initialising service: recentlyViewedService')
    await services.recentlyViewedService.init(userId)
  }

  if (!services.bookmarkService.isInitialised()) {
    logger.info('Initialising service: bookmarkService')
    await services.bookmarkService.init(userId)
  }

  if (!services.downloadPermissionService.isInitialised()) {
    logger.info('Initialising service: downloadPermissionService')
    await services.downloadPermissionService.init(userId)
  }
}

interface InitDPRServicesArgs {
  reportingClient: ReportingClient
  dashboardClient: DashboardClient
  reportDataStore: ReportDataStore
}

interface dprServices {
  reportingService?: ReportingService
  dashboardService?: DashboardService
  requestedReportService?: RequestedReportService
  recentlyViewedService?: RecentlyViewedStoreService
  bookmarkService?: BookmarkService
  downloadPermissionService?: DownloadPermissionService
}

export const createDprServices = (
  clients: InitDPRServicesArgs,
  reportStoreConfig: ReportStoreConfig = {},
): dprServices => {
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

  return services
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
  }

  if (config.bookmarking === undefined || config.bookmarking) {
    services = createBookmarkService(services, reportDataStore)
  }

  if (config.download === undefined || config.download) {
    services = createDownloadService(services, reportDataStore)
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
