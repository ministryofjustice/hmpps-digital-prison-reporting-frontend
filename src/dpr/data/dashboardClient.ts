import { DashboardDefinition } from '../components/_dashboards/dashboard/types'
import logger from '../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { ApiConfig } from './types'

class DashboardClient {
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
    this.logInfo('Get definition:', { dpdId, dashboardId })
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
    this.logInfo('Request dashboard:', { reportId, dashboardId })

    return this.restClient
      .get({
        path: `/async/dashboards/${reportId}/${dashboardId}`,
        token,
        query,
      })
      .then((response) => <Dict<string>>response)
  }

  getAsyncDashboard(
    token: string,
    reportId: string,
    dashboardId: string,
    tableId: string,
    query: Dict<string | number>,
  ): Promise<Array<Dict<string>>> {
    this.logInfo('Get dashboard:', { reportId, dashboardId, tableId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/dashboards/${dashboardId}/tables/${tableId}/result`,
        token,
        query,
      })
      .then((response) => <Array<Dict<string>>>response)
  }

  getAsyncStatus(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    tableId?: string,
    dataProductDefinitionsPath?: string,
  ): Promise<Dict<string>> {
    this.logInfo('Get status:', { reportId, dashboardId, executionId, tableId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/dashboards/${dashboardId}/statements/${executionId}/status`,
        token,
        query: {
          dataProductDefinitionsPath,
          tableId,
        },
      })
      .then((response) => <Dict<string>>response)
  }

  cancelAsyncRequest(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    dataProductDefinitionsPath: string,
  ): Promise<Dict<string>> {
    this.logInfo('Cancel request:', { reportId, dashboardId, executionId })

    return this.restClient
      .delete({
        path: `/reports/${reportId}/dashboards/${dashboardId}/statements/${executionId}`,
        token,
        query: {
          dataProductDefinitionsPath,
        },
      })
      .then((response) => <Dict<string>>response)
  }

  logInfo(title: string, args?: Dict<string>) {
    logger.info(`Dashboard client: ${title}:`)
    if (args && Object.keys(args).length) logger.info(JSON.stringify(args, null, 2))
  }
}

export { DashboardClient }
export default DashboardClient
