import { DashboardDefinition } from '../types/Dashboards'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class DashboardService {
  constructor(private readonly dashboardClient: any) {}

  async getDefinition(
    token: string,
    id: string,
    pdpId: string,
    dataProductDefinitionsPath?: string,
  ): Promise<DashboardDefinition> {
    return this.dashboardClient.getDefinition(token, id, pdpId, dataProductDefinitionsPath)
  }

  async getDefinitions(token: string, dataProductDefinitionsPath?: string): Promise<Array<DashboardDefinition>> {
    return this.dashboardClient.getDefinitions(token, dataProductDefinitionsPath)
  }
}
