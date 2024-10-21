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
    dashboardId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    logger.info(`Dashboard client: request ${reportId}:${dashboardId}`)

    return this.restClient
      .get({
        path: `/async/dashboards/${reportId}/${dashboardId}`,
        token,
        query,
      })
      .then((response) => <Dict<string>>response)
  }

  getAsyncStatus(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    dataProductDefinitionsPath?: string,
  ): Promise<Dict<string>> {
    logger.info(`Dashboard client: Get statementId: ${executionId} status`)

    return this.restClient
      .get({
        path: `/reports/${reportId}/dashboards/${dashboardId}/statements/${executionId}/status`,
        token,
        query: {
          dataProductDefinitionsPath,
        },
      })
      .then((response) => <Dict<string>>response)
  }

  cancelAsyncRequest(token: string, reportId: string, dashboardId: string, executionId: string): Promise<Dict<string>> {
    logger.info(`Dashboard client: request ${reportId} : ${dashboardId}`)

    return this.restClient
      .delete({
        path: `/reports/${reportId}/dashboards/${dashboardId}/statements/${executionId}`,
        token,
      })
      .then((response) => <Dict<string>>response)
  }
}
