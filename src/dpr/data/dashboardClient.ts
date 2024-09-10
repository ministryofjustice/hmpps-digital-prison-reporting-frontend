import { DahsboardDefinition } from '../types/Dashboards'
import logger from '../utils/logger'
import RestClient from './restClient'
import { ApiConfig } from './types'

export default class DashboardClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Dashboard API Client', config)
  }

  getDefinitions(token: string, definitionsPath?: string): Promise<Array<DahsboardDefinition>> {
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
      .then((response) => <Array<DahsboardDefinition>>response)
  }

  getDefinition(token: string, dashboardId: string, definitionsPath?: string): Promise<DahsboardDefinition> {
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
      .then((response) => <DahsboardDefinition>response)
  }
}
