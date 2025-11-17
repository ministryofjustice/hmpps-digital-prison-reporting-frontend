import ReportingClient from './reportingClient'
import DashboardClient from './dashboardClient'
import ReportDataStore, { RedisClient } from './reportDataStore'
import { ApiConfig, FeatureFlagConfig } from './types'
import MissingReportClient from '../services/missingReport/missingReportClient'
import { ProductCollectionService } from '../services/productCollection/productCollectionService'
import { FeatureFlagService } from '../services/featureFlagService'

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
    productCollectionService: new ProductCollectionService(reportingApiConfig),
    featureFlagService: new FeatureFlagService(featureFlagConfig)
  }
}

export default initDprReportingClients
