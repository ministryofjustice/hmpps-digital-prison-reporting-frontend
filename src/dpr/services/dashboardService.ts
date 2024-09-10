/* eslint-disable @typescript-eslint/no-explicit-any */
export default class DashboardService {
  // TODO: use correct client type, once implemented. Currently using a mocked client
  constructor(private readonly dashboardClient: any) {}

  async getDefinition(token: string, id: string) {
    return this.dashboardClient.getDefinition(token, id)
  }

  async getDefinitions() {
    return this.dashboardClient.getDefinitions()
  }
}
