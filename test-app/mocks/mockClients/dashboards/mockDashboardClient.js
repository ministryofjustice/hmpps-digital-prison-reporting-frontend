/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const dashboardDefinitions = require('./mockDashboardDefinition')
const { mockStatusSequence, mockStatusHelper } = require('../mockStatusHelper')
const mockDahsboardData = require('./mockDashboardData')
const mockDahsboardDataHelper = require('./mockDashboardResponseData')

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

  async getAsyncDashboard(token, reportId, dashboardId, tableId, query) {
    const def = await this.getDefinition('token', dashboardId)
    if (def) {
      const data = getData(def, dashboardId, query)
      const filteredData = filterByEstablishmentId(query, data)
      return new Promise((resolve) => {
        resolve(filteredData)
      })
    }
    return new Promise((resolve) => {
      resolve([])
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

const getData = (def, dashboardId, query) => {
  if (['test-dashboard-10'].includes(dashboardId)) {
    const start = query['filters.date.start']
    const end = query['filters.date.end']
    const granularity = query['filters.date.granularity']
    const data = mockDahsboardDataHelper.createTimeSeriesData(start, end, granularity)
    // console.log(JSON.stringify({ data }, null, 2))
    return data
  }
  return mockDahsboardData[dashboardId]
}

const filterByEstablishmentId = (query, data) => {
  if (query['filters.establishment_id']) {
    data = data.filter((d) => {
      let found = false
      if (Array.isArray(query['filters.establishment_id'])) {
        query['filters.establishment_id'].forEach((id) => {
          if (id === d.establishment_id) found = true
        })
      } else if (query['filters.establishment_id'] === d.establishment_id) found = true
      return found
    })
  }

  return data
}

module.exports = MockDashboardClient
