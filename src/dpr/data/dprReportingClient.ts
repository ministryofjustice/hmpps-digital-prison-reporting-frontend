import ReportingClient from './reportingClient'
import DashboardClient from './dashboardClient'
import ReportDataStore, { RedisClient } from './reportDataStore'
import { ApiConfig } from './types'

const initDprReportingClients = (reportingApiConfig: ApiConfig, redisClient: RedisClient) => {
  return {
    reportingClient: new ReportingClient(reportingApiConfig),
    dashboardClient: new DashboardClient(reportingApiConfig),
    reportDataStore: new ReportDataStore(redisClient),
  }
}

export default {
  initDprReportingClients,
}
