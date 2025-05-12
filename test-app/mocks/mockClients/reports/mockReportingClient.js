/* eslint-disable class-methods-use-this */
const definitions = require('./mockReportDefinition')
const mockStatusApiError = require('./mockStatusResponseError')
const mockBadQueryRequest = require('./mockBadQueryRequest')
const createMockData = require('./mockAsyncData')
const mockParentChild = require('./mockVariants/data/parent-child')

const { mockStatusSequence, mockStatusHelper } = require('../mockStatusHelper')

class MockReportingClient {
  constructor() {
    this.mockRequests = [{ executionId: `exId_1721738244284`, tableId: `tblId_1721738244284` }]
    this.statusResponses = mockStatusSequence
    this.RESULT_COUNT = 100
  }

  async requestAsyncReport(token, reportId, variantId, query) {
    this.logInfo('requestAsyncReport', { token, reportId, variantId }, query)

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

  async getAsyncReportStatus(token, reportId, variantId, executionId, definitionsPath, tableId) {
    this.logInfo('getAsyncReportStatus', {
      token,
      reportId,
      variantId,
      executionId,
      definitionsPath,
      tableId,
    })

    const statuses = this.getStatusResponses(variantId)
    return mockStatusHelper(this.mockRequests, statuses, executionId)
  }

  async getDefinition(token, reportId, variantId, definitionsPath) {
    this.logInfo('getDefinition', { token, reportId, variantId, definitionsPath })

    const report = definitions.reports.find((r) => r.id === reportId)
    const variant = report.variants.filter((v) => v.id === variantId)
    // eslint-disable-next-line prefer-destructuring
    const reportClone = JSON.parse(JSON.stringify(report))
    reportClone.variant = variant[0]
    delete reportClone.variants
    return Promise.resolve(reportClone)
  }

  async getDefinitions(token, definitionsPath) {
    this.logInfo('getDefinitions', { token, definitionsPath })

    return Promise.resolve(definitions.reports)
  }

  async getList(resourceName, token, listRequest) {
    const report = createMockData(10)

    return new Promise((resolve) => {
      resolve(report)
    })
  }

  async getCount(resourceName, token, query) {
    return new Promise((resolve) => {
      resolve(100)
    })
  }

  async getListWithWarnings(resourceName, token, listRequest) {
    const report = createMockData(10)

    return new Promise((resolve) => {
      resolve({ data: report })
    })
  }

  async getAsyncReport(token, reportId, variantId, tableId, query) {
    this.logInfo('getAsyncReport', { token, reportId, variantId, tableId }, query)

    const pageSize = +query.pageSize < this.RESULT_COUNT ? +query.pageSize : this.RESULT_COUNT

    let data = []
    switch (variantId) {
      case 'variantId-26':
        // Parent child template - parent
        data = mockParentChild.parentData()
        break
      case 'variantId-26-child':
        // Parent child template - child
        data = mockParentChild.childData()
        break
      default:
        data = createMockData(pageSize)
        break
    }

    return new Promise((resolve, reject) => {
      if (variantId === 'variantId-6') {
        reject(mockStatusApiError)
      }
      resolve(data)
    })
  }

  async cancelAsyncRequest(token, reportId, variantId, executionId, definitionsPath) {
    this.logInfo('cancelAsyncRequest', { token, reportId, variantId, executionId, definitionsPath })

    return new Promise((resolve) => {
      resolve({
        cancellationSucceeded: true,
      })
    })
  }

  async getAsyncCount(token, tableId, definitionsPath) {
    this.logInfo('getAsyncCount', { token, tableId, definitionsPath })

    return Promise.resolve(this.RESULT_COUNT)
  }

  async getAsyncInteractiveCount() {
    return Promise.resolve(this.RESULT_COUNT)
  }

  async getAsyncSummaryReport(token, reportId, variantId, tableId, summaryId, query) {
    this.logInfo('getAsyncSummaryReport', { token, reportId, variantId, tableId, summaryId }, query)

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
      case 'summary8':
        return Promise.resolve([
          {
            activity: 'Cleaning',
            measureType: '=',
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 0,
            total: 10,
          },
          {
            activity: 'Cleaning',
            measureType: '%',
            monday: 10,
            tuesday: 20,
            wednesday: 30,
            thursday: 40,
            friday: 0,
            total: 100,
          },
          {
            activity: 'Cooking',
            measureType: '=',
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 0,
            total: 10,
          },
          {
            activity: 'Cooking',
            measureType: '%',
            monday: 10,
            tuesday: 20,
            wednesday: 30,
            thursday: 40,
            friday: 0,
            total: 100,
          },
          {
            activity: 'Painting',
            measureType: '=',
            monday: 1,
            tuesday: 2,
            wednesday: 3,
            thursday: 4,
            friday: 0,
            total: 10,
          },
          {
            activity: 'Painting',
            measureType: '%',
            monday: 10,
            tuesday: 20,
            wednesday: 30,
            thursday: 40,
            friday: 0,
            total: 100,
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

  logInfo(functionName, args, query) {
    console.log(`
MockReportingClient: ${functionName}`)
    console.log(JSON.stringify(args, null, 2))
    if (query) {
      console.log(JSON.stringify(query, null, 2))
    }
  }
}

module.exports = MockReportingClient
