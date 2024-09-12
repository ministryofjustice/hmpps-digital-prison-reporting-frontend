const dashboardDefinitions = require('./mockDashboardDefinition')

class MockDashboardClient {
  constructor() {
    this.dashboards = dashboardDefinitions
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDefinition(token, id) {
    return Promise.resolve(this.dashboards.find((d) => d.id === id))
  }

  async getDefinitions() {
    Promise.resolve(this.dashboards)
  }
}

module.exports = MockDashboardClient
