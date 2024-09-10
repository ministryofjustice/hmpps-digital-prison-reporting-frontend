import { DashboardDefinition } from '../types/Dashboards'
import logger from '../utils/logger'
import RestClient from './restClient'
import { ApiConfig } from './types'

export default class DashboardClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Dashboard API Client', config)
  }

  getDefinitions(token: string, definitionsPath?: string): Promise<Array<DashboardDefinition>> {
    logger.info(`Dashboard client: Get definitions`)

    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }

    return this.restClient
      .get({
        path: '/definitions/dashboards',
        query,
        token,
      })
      .then((response) => <Array<DashboardDefinition>>response)
  }

  getDefinition(token: string, dashboardId: string, definitionsPath?: string): Promise<DashboardDefinition> {
    logger.info(`Dashboard client: Get definition: ${dashboardId}`)
    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }
    return this.restClient
      .get({
        path: `/definitions/dashboards/${dashboardId}`,
        query,
        token,
      })
      .then((response) => <DashboardDefinition>response)
  }
}
