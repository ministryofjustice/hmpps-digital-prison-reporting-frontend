import MockDashboardClient from '../../../test-app/mockChartData/mockDashboardClient'

export default class DashboardService {
  constructor(private readonly mockDashboardClient: MockDashboardClient) {
    // TODO: init DahsboardClient? needs creating. Or use existing ReportingClient
  }

  /**
   * Mock placeholder function for Dashboard API
   * - get metric data
   * // TODO: implement properly once API is ready
   *
   * @param {string} token
   * @param {string} id dashboard id
   * @return {*}
   * @memberof DashboardService
   */
  async getDefinition(token: string, id: string) {
    return this.mockDashboardClient.getDefinition(token, id)
  }

  async getDefinitions() {
    return this.mockDashboardClient.getDefinitions()
  }
}
