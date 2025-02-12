import { DashboardDefinition } from '../components/_dashboards/dashboard/types'
import Dict = NodeJS.Dict

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class DashboardService {
  constructor(private readonly dashboardClient: any) {}

  async getDefinition(
    token: string,
    id: string,
    dpdId: string,
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
  ): Promise<Dict<string>> {
    return this.dashboardClient.cancelAsyncRequest(token, reportId, dashboardId, executionId)
  }

  async getAsyncStatus(
    token: string,
    reportId: string,
    dashboardId: string,
    executionId: string,
    dataProductDefinitionsPath: string,
    tableId: string,
  ): Promise<Dict<string>> {
    return this.dashboardClient.getAsyncStatus(
      token,
      reportId,
      dashboardId,
      executionId,
      dataProductDefinitionsPath,
      tableId,
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
