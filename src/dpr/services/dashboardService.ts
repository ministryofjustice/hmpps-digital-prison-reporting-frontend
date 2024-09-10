/* eslint-disable @typescript-eslint/no-explicit-any */
export default class DashboardService {
  constructor(private readonly dashboardClient: any) {}

  async getDefinition(token: string, id: string, dataProductDefinitionsPath?: string) {
    return this.dashboardClient.getDefinition(token, id, dataProductDefinitionsPath)
  }

  async getDefinitions(token: string, dataProductDefinitionsPath?: string) {
    return this.dashboardClient.getDefinitions(token, dataProductDefinitionsPath)
  }
}
