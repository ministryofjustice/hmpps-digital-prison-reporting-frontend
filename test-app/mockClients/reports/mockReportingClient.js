/* eslint-disable class-methods-use-this */
const definitions = require('./mockReportDefinition')
const mockStatusApiResponse = require('./mockStatusApiReponse')
const mockStatusApiError = require('./mockStatusResponseError')
const mockBadQueryRequest = require('./mockBadQueryRequest')
const createMockData = require('./mockAsyncData')

class MockReportingClient {
  constructor() {
    this.mockRequests = [{ executionId: `exId_1721738244284`, tableId: `tblId_1721738244284` }]
    this.statusResponses = {
      happyStatuses: ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED'],
      sadStatuses: ['SUBMITTED', 'PICKED', 'STARTED', 'FAILED'],
      sadServerStatuses: ['SUBMITTED', 'PICKED', 500],
      expiredStatuses: ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED', 'READY', 500],
      timedOutStatuses: new Array(500).fill('STARTED'),
    }
    this.RESULT_COUNT = 100
  }

  async requestAsyncReport(token, reportId, variantId) {
    const unix = Date.now()
    return new Promise((resolve, reject) => {
      if (variantId !== 'variantId-5') {
        this.mockRequests.push({ executionId: `exId_${unix}`, status: 'SUBMITTED' })
        setTimeout(resolve, 1000, { executionId: `exId_${unix}`, tableId: `tblId_${unix}` })
      } else {
        reject(mockBadQueryRequest)
      }
    })
  }

  async getAsyncReportStatus(token, reportId, variantId, executionId) {
    const mockResponse = Object.assign(mockStatusApiResponse, {})
    const statuses = this.getStatusResponses(variantId)

    let reportIndex = this.mockRequests.findIndex((r) => r.executionId === executionId)
    if (reportIndex === -1) reportIndex = 0

    const currentStatus = this.mockRequests[reportIndex].status
    const currentStatusIndex = statuses.findIndex((status) => status === currentStatus)
    const nextStatus =
      statuses.length > currentStatusIndex + 1 ? statuses[currentStatusIndex + 1] : statuses[currentStatusIndex]

    if (nextStatus) {
      this.mockRequests[reportIndex].status = nextStatus
    }
    mockResponse.status = this.mockRequests[reportIndex].status

    if (nextStatus === 'FAILED') {
      mockResponse.error = {
        userMessage: 'An error has occurred for some reason - Status API returned Failed Status',
        developerMessage: 'Mock stack trace',
      }
    }

    if (nextStatus === 'READY') {
      mockResponse.status = 'FINISHED'
    }

    if (typeof mockResponse.status !== 'string') {
      return Promise.reject(mockStatusApiError)
    }

    return Promise.resolve(mockResponse)
  }

  async getDefinition(token, reportId, variantId) {
    const report = { ...definitions.report }
    const variant = report.variants.filter((v) => v.id === variantId)
    // eslint-disable-next-line prefer-destructuring
    report.variant = variant[0]
    delete report.variants
    return Promise.resolve(report)
  }

  async getDefinitions() {
    return Promise.resolve(definitions.reports)
  }

  async getAsyncReport(token, reportId, variantId, tableId, query) {
    const pageSize = +query.pageSize < this.RESULT_COUNT ? +query.pageSize : this.RESULT_COUNT
    const report = createMockData(pageSize)
    return new Promise((resolve, reject) => {
      if (variantId === 'variantId-6') {
        reject(mockStatusApiError)
      }
      resolve(report)
    })
  }

  async cancelAsyncRequest() {
    return new Promise((resolve) => {
      resolve({
        cancellationSucceeded: true,
      })
    })
  }

  async getAsyncCount() {
    return Promise.resolve(this.RESULT_COUNT)
  }

  async getAsyncSummaryReport(token, reportId, variantId, tableId, summaryId) {
    switch (summaryId) {
      case 'summary3':
        return Promise.resolve([
          { percentGood: 1, percentBad: 10, percentUgly: 98 },
          { percentGood: 2, percentBad: 12, percentUgly: 97 },
          { percentGood: 3, percentBad: 11, percentUgly: 96 },
          { percentGood: 4, percentBad: 14, percentUgly: 95 },
          { percentGood: 5, percentBad: 12, percentUgly: 94 },
          { percentGood: 1, percentBad: 10, percentUgly: 98 },
          { percentGood: 2, percentBad: 12, percentUgly: 97 },
          { percentGood: 3, percentBad: 11, percentUgly: 96 },
          { percentGood: 4, percentBad: 14, percentUgly: 95 },
          { percentGood: 5, percentBad: 12, percentUgly: 94 },
          { percentGood: 1, percentBad: 10, percentUgly: 98 },
          { percentGood: 2, percentBad: 12, percentUgly: 97 },
          { percentGood: 3, percentBad: 11, percentUgly: 96 },
          { percentGood: 4, percentBad: 14, percentUgly: 95 },
          { percentGood: 5, percentBad: 12, percentUgly: 94 },
          { percentGood: 1, percentBad: 10, percentUgly: 98 },
          { percentGood: 2, percentBad: 12, percentUgly: 97 },
          { percentGood: 3, percentBad: 11, percentUgly: 96 },
          { percentGood: 4, percentBad: 14, percentUgly: 95 },
          { percentGood: 5, percentBad: 12, percentUgly: 94 },
        ])
      case 'summary4':
        return Promise.resolve([{ field1: 57, field2: 1, field3: 12219380923, field4: '3 Freds' }])
      case 'summary5':
        return Promise.resolve([{ field1: 'Percentageness', field2: '10%', field3: '20%', field4: '90%' }])
      case 'summary6':
        return Promise.resolve([
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Header',
            field2: 1,
            field3: 12219380923,
            field4: '4 Freds',
          },
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Header',
            field2: 2,
            field3: 12219380923,
            field4: '4 Freds',
          },
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Header',
            field2: 3,
            field3: 12219380923,
            field4: '4 Freds',
          },
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Header',
            field2: 4,
            field3: 12219380923,
            field4: '4 Freds',
          },
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Header',
            field2: 5,
            field3: 12219380923,
            field4: '4 Freds',
          },
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Header',
            field2: 6,
            field3: 12219380923,
            field4: '4 Freds',
          },
          {
            section1: 'Two',
            section2: 'A',
            field1: 'Section Two A Header',
            field2: 1,
            field3: 12219380923,
            field4: '5 Freds',
          },
        ])
      case 'summary7':
        return Promise.resolve([
          {
            section1: 'One',
            section2: 'A',
            field1: 'Section One A Footer',
            field2: 1,
            field3: 12219380923,
            field4: '6 Freds',
          },
          {
            section1: 'One',
            section2: 'B',
            field1: 'Section One B Footer',
            field2: 1,
            field3: 12219380923,
            field4: '7 Freds',
          },
        ])
      default:
        return Promise.resolve([{ total: 52 }])
    }
  }

  // Mock Helpers
  getStatusResponses(variantId) {
    switch (variantId) {
      case 'variantId-2':
        return this.statusResponses.sadStatuses
      case 'variantId-3':
        return this.statusResponses.sadServerStatuses
      case 'variantId-4':
        return this.statusResponses.expiredStatuses
      case 'variantId-14':
        return this.statusResponses.timedOutStatuses
      default:
        return this.statusResponses.happyStatuses
    }
  }
}

module.exports = MockReportingClient
