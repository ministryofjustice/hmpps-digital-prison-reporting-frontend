/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const dashboardDefinitions = require('./mockDashboardDefinition')
const { mockStatusSequence, mockStatusHelper } = require('../mockStatusHelper')
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

const customiseDataset = (id) => {
  let sets = 1
  switch (id) {
    case 'test-dashboard-1':
      sets = 1
      break
    case 'test-dashboard-2':
      sets = 2
      break
    case 'test-dashboard-3':
      sets = 3
      break
    case 'test-dashboard-4':
      sets = 4
      break
    case 'test-dashboard-5':
      sets = 5
      break
    case 'test-dashboard-6':
      sets = 6
      break
    case 'test-dashboard-7':
      sets = 7
      break
    case 'test-dashboard-8':
      sets = 4
      break
    case 'test-dashboard-9':
      sets = 1
      break
    case 'test-dashboard-10':
      sets = 4
      break
    case 'test-dashboard-11':
      sets = 4
      break
    default:
      break
  }
  return { sets }
}

const getData = (def, dashboardId, query) => {
  const start = query['filters.date.start']
  const end = query['filters.date.end']
  const granularity = query['filters.date.granularity']
  const { sets } = customiseDataset(dashboardId)
  const data = mockDahsboardDataHelper.createTimeSeriesData(start, end, granularity, sets)
  return data
}

const filterByEstablishmentId = (query, data) => {
  if (query['filters.establishment_id']) {
    data = data.map((ts) => {
      return ts.filter((d) => {
        let found = false
        if (Array.isArray(query['filters.establishment_id'])) {
          query['filters.establishment_id'].forEach((id) => {
            if (id === d.establishment_id.raw) found = true
          })
        } else if (query['filters.establishment_id'] === d.establishment_id.raw) found = true
        return found
      })
    })
  }

  return data
}

module.exports = MockDashboardClient
