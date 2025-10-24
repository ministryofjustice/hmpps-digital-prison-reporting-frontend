import { DashboardDefinition } from '../components/_dashboards/dashboard/types'
import Dict = NodeJS.Dict
import logger from '../utils/logger'

/* eslint-disable @typescript-eslint/no-explicit-any */
class DashboardService {
  constructor(private readonly dashboardClient: any) {
    this.dashboardClient = dashboardClient
    logger.info('Service created: DashboardService')
  }

  async getDefinition(
    token: string,
    dpdId: string,
    id: string,
    dataProductDefinitionsPath?: string,
  ): Promise<DashboardDefinition> {
    return this.dashboardClient.getDefinition(token, id, dpdId, dataProductDefinitionsPath)
  }

  async requestAsyncDashboard(
    token: string,
    reportId: string,
    dashboardId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    return this.dashboardClient.requestAsyncDashboard(token, reportId, dashboardId, query)
  }

  async cancelAsyncRequest(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    dataProductDefinitionsPath?: string,
  ): Promise<Dict<string>> {
    return this.dashboardClient.cancelAsyncRequest(
      token,
      reportId,
      dashboardId,
      executionId,
      dataProductDefinitionsPath,
    )
  }

  async getAsyncStatus(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    tableId?: string,
    dataProductDefinitionsPath?: string,
  ): Promise<Dict<string>> {
    return this.dashboardClient.getAsyncStatus(
      token,
      reportId,
      dashboardId,
      executionId,
      tableId,
      dataProductDefinitionsPath,
    )
  }

  async getAsyncDashboard(
    token: string,
    dashboardId: string,
    reportId: string,
    tableId: string,
    query: Dict<string | number>,
  ): Promise<Array<Dict<string>>> {
    return this.dashboardClient.getAsyncDashboard(token, reportId, dashboardId, tableId, query)
  }
}

export { DashboardService }
export default DashboardService
