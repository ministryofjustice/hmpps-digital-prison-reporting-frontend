/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const dayjs = require('dayjs')
const dashboardDefinitions = require('./dashboard-definitions')
const { mockStatusSequence, mockStatusHelper } = require('../mockStatusHelper')
const { generateAgeBreakdownData } = require('./definitions/age-breakdown/data')
const { createTimeSeriesData } = require('./definitions/data-quality/data')
const MockDataHelper = require('./mockDataHelper')

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
      return new Promise((resolve) => {
        resolve(data)
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
  // Age Breakdown report
  if (['age-breakdown-dashboard-1', 'age-breakdown-dashboard-2'].includes(dashboardId)) {
    const establishmentId = query['filters.establishment_id']
    const wing = query['filters.wing']
    return generateAgeBreakdownData(establishmentId, wing)
  }

  const start = query['filters.date.start'] || dayjs().format('YYYY-MM-DD')
  const end = query['filters.date.end'] || dayjs().format('YYYY-MM-DD')
  const granularity = query['filters.date.granularity'] || 'daily'

  if (['mock-data-dashboard-1'].includes(dashboardId)) {
    const data = {
      total_prisoners: 'number',
      empty_column_1: 'null',
      empty_column_2: 'null',
      random_metric: 'number',
      random_metric_2: 'number',
    }
    const mockData = MockDataHelper.createTimeSeriesData(start, end, granularity, data, 3, true)
    const filteredData = filterByEstablishmentId(query, mockData)
    return filteredData
  }

  const data = createTimeSeriesData(start, end, granularity, 3)
  const filteredData = filterByEstablishmentId(query, data)

  return filteredData
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
