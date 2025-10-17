import ReportingClient from './reportingClient'
import DashboardClient from './dashboardClient'
import ReportDataStore, { RedisClient } from './reportDataStore'
import { ApiConfig } from './types'
import MissingReportClient from '../services/missingReport/missingReportClient'

export const initDprReportingClients = (reportingApiConfig: ApiConfig, redisClient: RedisClient, storePrefix?: string) => {
  return {
    reportingClient: new ReportingClient(reportingApiConfig),
    dashboardClient: new DashboardClient(reportingApiConfig),
    reportDataStore: new ReportDataStore(redisClient, storePrefix),
    missingReportClient: new MissingReportClient(reportingApiConfig),
  }
}

export default initDprReportingClients
