/* eslint-disable prefer-destructuring */
const definitions = require('./mockReportDefinition')
const mockStatusApiResponse = require('./mockStatusApiReponse')
const mockStatusApiError = require('./mockStatusResponseError')
const mockBadQueryRequest = require('./mockBadQueryRequest')
const createMockData = require('./mockAsyncData')

const mockAPIStatus = [{ executionId: `exId_1721738244284`, tableId: `tblId_1721738244284` }]
const happyStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED']
const sadStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FAILED']
const sadServerStatuses = ['SUBMITTED', 'PICKED', 500]
const expiredStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED', 'READY', 500]
const timedOutStatuses = new Array(500).fill('STARTED')
const RESULT_COUNT = 100

const getAsyncReportStatus = (token, reportId, variantId, executionId) => {
  const mockResponse = Object.assign(mockStatusApiResponse, {})
  let statuses
  switch (variantId) {
    case 'variantId-2':
      statuses = sadStatuses
      break
    case 'variantId-3':
      statuses = sadServerStatuses
      break
    case 'variantId-4':
      statuses = expiredStatuses
      break
    case 'variantId-14':
      statuses = timedOutStatuses
      break
    default:
      statuses = happyStatuses
      break
  }

  let reportIndex = mockAPIStatus.findIndex((r) => r.executionId === executionId)
  if (reportIndex === -1) reportIndex = 0
  const currentStatus = mockAPIStatus[reportIndex].status
  const statusIndex = statuses.findIndex((status) => status === currentStatus)
  const nextStatus = statuses.length > statusIndex + 1 ? statuses[statusIndex + 1] : statuses[statusIndex]

  if (nextStatus) {
    mockAPIStatus[reportIndex].status = nextStatus
  }
  mockResponse.status = mockAPIStatus[reportIndex].status

  if (nextStatus === 'FAILED') {
    mockResponse.error = 'An error has occurred for some reason - Status API returned Failed Status'
  }

  if (nextStatus === 'READY') {
    mockResponse.status = 'FINISHED'
  }

  if (typeof mockResponse.status !== 'string') {
    return Promise.reject(mockStatusApiError)
  }

  return Promise.resolve(mockResponse)
}

const requestAsyncReport = (token, reportId, variantId) => {
  const unix = Date.now()
  return new Promise((resolve, reject) => {
    if (variantId !== 'variantId-5') {
      mockAPIStatus.push({ executionId: `exId_${unix}`, status: 'redirect-call' })
      setTimeout(resolve, 1000, { executionId: `exId_${unix}`, tableId: `tblId_${unix}` })
    } else {
      reject(mockBadQueryRequest)
    }
  })
}

const getDefinition = (token, reportId, variantId) => {
  // const report = { ...definitions.report }
  const reportData = definitions.reports.find((rep) => rep.id === reportId) || definitions.report
  const report = { ...reportData }
  const variant = report.variants.filter((v) => v.id === variantId)
  report.variant = variant[0]
  delete report.variants
  return Promise.resolve(report)
}

const getAsyncReport = (token, reportId, variantId, tableId, query) => {
  const pageSize = +query.pageSize < RESULT_COUNT ? +query.pageSize : RESULT_COUNT
  const report = createMockData(pageSize)
  return new Promise((resolve, reject) => {
    if (variantId === 'variantId-6') {
      reject(mockStatusApiError)
    }
    resolve(report)
  })
}

const cancelAsyncRequest = () => {
  return new Promise((resolve) => {
    resolve({
      cancellationSucceeded: true,
    })
  })
}

const getAsyncCount = () => Promise.resolve(RESULT_COUNT)

const getAsyncSummaryReport = (token, reportId, variantId, tableId, summaryId) => {
  switch (summaryId) {
    case 'summary3':
      return Promise.resolve([{ percentGood: 45, percentBad: 10, percentUgly: 98 }])
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
    default:
      return Promise.resolve([{ total: 52 }])
  }
}

module.exports = {
  getAsyncReportStatus,
  requestAsyncReport,
  getAsyncReport,
  getDefinition,
  getAsyncCount,
  cancelAsyncRequest,
  getAsyncSummaryReport,
}
