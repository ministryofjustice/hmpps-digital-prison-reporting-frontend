const dashboardDefinitions = require('./mockDashboardDefinition')

class MockDashboardClient {
  constructor() {
    this.dashboards = dashboardDefinitions
    this.requests = []
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDefinition(token, id) {
    return Promise.resolve(this.dashboards.find((d) => d.id === id))
  }

  async getDefinitions() {
    Promise.resolve(this.dashboards)
  }

  async requestAsyncDashboard(token, reportId, variantId) {
    console.log('mock requestAsyncDashboard client')
    const unix = Date.now()
    return new Promise((resolve, reject) => {
      if (variantId !== 'variantId-5') {
        this.requests.push({ executionId: `exId_${unix}`, status: 'redirect-call' })
        setTimeout(resolve, 1000, { executionId: `exId_${unix}`, tableId: `tblId_${unix}` })
      } else {
        reject()
      }
    })
  }
}

module.exports = MockDashboardClient
