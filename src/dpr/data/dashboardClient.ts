import logger from '../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { ApiConfig } from './types'
import { components } from '../types/api'
import { DashboardDataResponse } from '../types/Metrics'

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
    queryData?: Dict<string | string[]> | undefined,
  ): Promise<components['schemas']['DashboardDefinition']> {
    const query = {
      ...queryData,
      dataProductDefinitionsPath: definitionsPath,
    }
    this.logInfo('Get definition:', { dpdId, dashboardId, ...query })

    return this.restClient
      .get({
        path: `/definitions/${dpdId}/dashboards/${dashboardId}`,
        query,
        token,
      })
      .then((response) => <components['schemas']['DashboardDefinition']>response)
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
    query: Record<string, string | string[]>,
  ): Promise<DashboardDataResponse[][]> {
    this.logInfo('Get dashboard:', { reportId, dashboardId, tableId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/dashboards/${dashboardId}/tables/${tableId}/result`,
        token,
        query,
      })
      .then((response) => <DashboardDataResponse[][]>response)
  }

  getAsyncStatus(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    tableId?: string,
    dataProductDefinitionsPath?: string,
  ): Promise<components['schemas']['StatementExecutionStatus']> {
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
      .then((response) => <components['schemas']['StatementExecutionStatus']>response)
  }

  cancelAsyncRequest(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    dataProductDefinitionsPath?: string,
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
