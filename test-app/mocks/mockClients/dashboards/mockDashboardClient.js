/* eslint-disable class-methods-use-this */
const dashboardDefinitions = require('./mockDashboardDefinition')
const { mockStatusSequence, mockStatusHelper } = require('../mockStatusHelper')

class MockDashboardClient {
  constructor() {
    this.dashboards = dashboardDefinitions
    this.requests = [{ executionId: `exId_1721738244284`, tableId: `tblId_1721738244284` }]
    this.statusResponses = mockStatusSequence
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDefinition(token, id) {
    return Promise.resolve(this.dashboards.find((d) => d.id === id))
  }

  async getDefinitions() {
    Promise.resolve(this.dashboards)
  }

  async requestAsyncDashboard(token, reportId, id) {
    const unix = Date.now()
    return new Promise((resolve, reject) => {
      if (id !== 'test-dashboard-6') {
        this.requests.push({ executionId: `exId_${unix}`, status: 'redirect-call' })
        setTimeout(resolve, 1000, { executionId: `exId_${unix}`, tableId: `tblId_${unix}` })
      } else {
        reject()
      }
    })
  }

  async getAsyncStatus(token, reportId, id, executionId) {
    const statuses = this.getStatusResponses(id)
    return mockStatusHelper(this.requests, statuses, executionId)
  }

  async cancelAsyncRequest() {
    return new Promise((resolve) => {
      resolve({
        cancellationSucceeded: true,
      })
    })
  }

  // Mock Helpers
  getStatusResponses(dashboardId) {
    switch (dashboardId) {
      case 'test-dashboard-2':
        return this.statusResponses.sadStatuses
      case 'test-dashboard-3':
        return this.statusResponses.sadServerStatuses
      case 'test-dashboard-4':
        return this.statusResponses.expiredStatuses
      case 'test-dashboard-5':
        return this.statusResponses.timedOutStatuses
      default:
        return this.statusResponses.happyStatuses
    }
  }
}

module.exports = MockDashboardClient