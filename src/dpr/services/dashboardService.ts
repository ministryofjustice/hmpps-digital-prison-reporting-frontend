export default class DashboardService {
  constructor() {
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
    return mockDashboardClient.getDefinition(token, id)
  }

  async getDefinitions() {
    return mockDashboardClient.getDefinitions()
  }
}

// MOCK DASHBOARD CLIENT
// TODO: implement for real when API is ready
const mockDashboardClient = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDefinition: async (tokenC: string, idC: string): Promise<{ id: string; metrics: { id: string }[] }> => {
    return Promise.resolve(dashboards.find((d) => d.id === idC))
  },

  getDefinitions: async () => {
    Promise.resolve(dashboards)
  },
}

const dashboards = [
  {
    id: 'dashboard1',
    metrics: [{ id: 'multi_chart-0' }, { id: 'multi_chart-2' }, { id: 'line-chart-2' }],
  },
  {
    id: 'dashboard2',
    metrics: [{ id: 'multi_chart-1' }, { id: 'multi_chart-0' }, { id: 'line-chart-0' }],
  },
]
