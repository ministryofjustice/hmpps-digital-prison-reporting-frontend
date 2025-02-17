/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
const dashboardDefinitions = require('./dashboard-definitions')
const { mockStatusSequence, mockStatusHelper } = require('../mockStatusHelper')
const { generateAgeBreakdownData } = require('./data/age-breakdown/data')
const AgeBreakdownDataHelper = require('./data/age-breakdown/dataGenerator')
const TestDataHelper = require('./data/test-data/dataGenerator')
const DataQualityMetricsHelper = require('./data/data-quality-metrics/dataGenerator')

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
      // console.log(JSON.stringify({ data }, null, 2))
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
  const establishmentId = query['filters.establishment_id']
  const wing = query['filters.wing']

  if (['age-breakdown-dashboard-1', 'age-breakdown-dashboard-2'].includes(dashboardId)) {
    return generateAgeBreakdownData(establishmentId, wing)
  }

  if (['age-breakdown-dashboard-3', 'lists-example-dashboard'].includes(dashboardId)) {
    return AgeBreakdownDataHelper.generateData(query)
  }

  if (
    [
      'list-examples-fallback-keys',
      'list-examples-historic-diet-totals',
      'list-examples-diet-totals',
      'scorecard-examples-diet-totals',
      'chart-examples-historic-diet-totals',
    ].includes(dashboardId)
  ) {
    return TestDataHelper.generateData(query)
  }

  const data = DataQualityMetricsHelper.generateData(query)
  return data
}

module.exports = MockDashboardClient
