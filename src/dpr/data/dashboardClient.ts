import { DashboardDefinition } from '../types/Dashboards'
import logger from '../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { ApiConfig } from './types'

export default class DashboardClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Dashboard API Client', config)
  }

  getDefinition(
    token: string,
    dashboardId: string,
    dpdId: string,
    definitionsPath?: string,
  ): Promise<DashboardDefinition> {
    logger.info(`Dashboard client: Get definition: ${dpdId}/${dashboardId}`)
    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }
    return this.restClient
      .get({
        path: `/definitions/${dpdId}/dashboards/${dashboardId}`,
        query,
        token,
      })
      .then((response) => <DashboardDefinition>response)
  }

  requestAsyncDashboard(
    token: string,
    reportId: string,
    variantId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    logger.info(`Dashboard client: request ${reportId}:${variantId}`)

    return this.restClient
      .get({
        path: `/async/dashboards/${reportId}/${variantId}`,
        token,
        query,
      })
      .then((response) => <Dict<string>>response)
  }
}
