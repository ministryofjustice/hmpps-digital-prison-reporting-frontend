import type { RedisClientType } from 'redis'
import ReportingClient from './reportingClient'
import DashboardClient from './dashboardClient'
import ReportDataStore from './reportDataStore'
import { ApiConfig, FeatureFlagConfig, MigrationServiceConfig } from './types'
import { FeatureFlagService } from '../services/featureFlagService'
import ProductCollectionClient from './productCollectionClient'
import MissingReportClient from './missingReportClient'
import { ReportIdMigrationService } from '../services/reportIdMigrationService'

export const initDprReportingClients = (
  reportingApiConfig: ApiConfig,
  redisClient: RedisClientType,
  storePrefix?: string,
  featureFlagConfig?: FeatureFlagConfig,
  migrationServiceConfig?: MigrationServiceConfig,
) => {
  return {
    reportingClient: new ReportingClient(reportingApiConfig),
    dashboardClient: new DashboardClient(reportingApiConfig),
    reportDataStore: new ReportDataStore(redisClient, storePrefix),
    missingReportClient: new MissingReportClient(reportingApiConfig),
    productCollectionClient: new ProductCollectionClient(reportingApiConfig),
    featureFlagService: new FeatureFlagService(featureFlagConfig),
    reportIdMigrationService: new ReportIdMigrationService(redisClient, migrationServiceConfig),
  }
}

export default initDprReportingClients
