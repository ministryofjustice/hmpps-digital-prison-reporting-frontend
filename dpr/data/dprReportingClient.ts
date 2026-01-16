import ReportingClient from './reportingClient'
import DashboardClient from './dashboardClient'
import ReportDataStore, { RedisClient } from './reportDataStore'
import { ApiConfig, FeatureFlagConfig } from './types'
import { FeatureFlagService } from '../services/featureFlagService'
import ProductCollectionClient from './productCollectionClient'
import MissingReportClient from './missingReportClient'

export const initDprReportingClients = (
  reportingApiConfig: ApiConfig,
  redisClient: RedisClient,
  storePrefix?: string,
  featureFlagConfig?: FeatureFlagConfig,
) => {
  return {
    reportingClient: new ReportingClient(reportingApiConfig),
    dashboardClient: new DashboardClient(reportingApiConfig),
    reportDataStore: new ReportDataStore(redisClient, storePrefix),
    missingReportClient: new MissingReportClient(reportingApiConfig),
    productCollectionClient: new ProductCollectionClient(reportingApiConfig),
    featureFlagService: new FeatureFlagService(featureFlagConfig),
  }
}

export default initDprReportingClients
