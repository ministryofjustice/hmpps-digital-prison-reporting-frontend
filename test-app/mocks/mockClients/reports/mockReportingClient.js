/* eslint-disable class-methods-use-this */
const defs = require('./mockReportDefinition')
const mockStatusApiError = require('./mockStatusResponseError')
const mockBadQueryRequest = require('./mockBadQueryRequest')
const createMockData = require('./mockAsyncData')
const mockParentChild = require('./mockVariants/data/parent-child')
const mockListSection = require('./mockVariants/data/list-section')
const mockParentChildSection = require('./mockVariants/data/parent-child-section')
const mockRowSectionChild = require('./mockVariants/data/row-section-child')
const mockRowSectionData = require('./mockVariants/data/row-section')
const mockRowSectionDataMultiple = require('./mockVariants/data/row-section_multiple_rows')
const mockRowSectionChildDataMultiple = require('./mockVariants/data/row-section-child_multiple-rows')
const mockRowSectionIncidentReport = require('./mockVariants/data/row-section_incident_report')

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

    const report = defs.reports.find((r) => r.id === reportId)
    const variant = report.variants.filter((v) => v.id === variantId)
    // eslint-disable-next-line prefer-destructuring
    const reportClone = JSON.parse(JSON.stringify(report))
    reportClone.variant = variant[0]
    delete reportClone.variants
    return Promise.resolve(reportClone)
  }

  async getDefinitionSummary(token, reportId, definitionsPath) {
    this.logInfo('getDefinitions', { token, definitionsPath })
    const report = defs.reports.find((r) => r.id === reportId)
    return Promise.resolve(report)
  }

  async getDefinitions(token, definitionsPath) {
    this.logInfo('getDefinitions', { token, definitionsPath })

    return Promise.resolve(defs.reports)
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
      case 'report-template-example-parent-child':
        // Parent child template - parent
        data = mockParentChild.parentData()
        break
      case 'report-template-example-parent-child_child':
        // Parent child template - child
        data = mockParentChild.childData()
        break
      case 'report-template-example-list-section':
        // List section
        data = mockListSection.listSectionData()
        break
      case 'report-template-example-parent-child-section':
        // Parent-child-section - parent
        data = mockParentChildSection.parentData()
        break
      case 'report-template-example-parent-child-section_child':
        // List section
        data = mockParentChildSection.childData()
        break
      case 'variantId-30-row-section':
        // Single row template
        data = mockRowSectionData
        break
      case 'report-template-example-row-section-child':
        // row-section-child - parent
        data = mockRowSectionChild.parentData()
        break
      case 'report-template-example-row-section-child_child':
        data = mockRowSectionChild.childData()
        break
      case 'report-template-example-row-section-child_child-2':
        data = mockRowSectionChild.childData2()
        break
      case 'report-template-example-row-section-multiple-rows':
        data = mockRowSectionDataMultiple
        break
      case 'report-template-example-row-section-child-multiple':
        // row-section-child- multiple - parent
        data = mockRowSectionChildDataMultiple.parentData()
        break
      case 'report-template-example-row-section-child-multiple_child':
        data = mockRowSectionChildDataMultiple.childData()
        break
      case 'report-template-example-row-section-child-multiple_child-2':
        data = mockRowSectionChildDataMultiple.childData2()
        break
      case 'variantId-34':
        // incident report
        data = mockRowSectionIncidentReport.parentData()
        break
      case 'variantId-34-prisoners-involved':
        data = mockRowSectionIncidentReport.section2Data()
        break
      case 'variantId-34-staff-involved':
        data = mockRowSectionIncidentReport.section3Data()
        break
      case 'variantId-34-incident-details':
        data = mockRowSectionIncidentReport.section4Data()
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
        return Promise.resolve([{ percentGood: 1, percentBad: 10, percentUgly: 89 }])
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
      case 'request-example-fail-status':
        return this.statusResponses.sadStatuses
      case 'request-example-fail-code':
        return this.statusResponses.sadServerStatuses
      case 'request-example-expire':
        return this.statusResponses.expiredStatuses
      case 'request-example-timeout':
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
