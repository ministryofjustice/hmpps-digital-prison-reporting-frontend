/* eslint-disable prefer-destructuring */
const definitions = require('./mockReportDefinition')
const mockStatusApiResponse = require('./mockStatusApiReponse')
const mockStatusApiError = require('./mockStatusResponseError')
const mockBadQueryRequest = require('./mockBadQueryRequest')
const createMockData = require('./mockAsyncData')

const mockAPIStatus = []
const happyStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED']
const sadStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FAILED']
const sadServerStatuses = ['SUBMITTED', 'PICKED', 500]
const expiredStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED', 'READY', 'EXPIRED']
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
    default:
      statuses = happyStatuses
      break
  }

  const reportIndex = mockAPIStatus.findIndex((r) => r.executionId === executionId)
  const currentStatus = mockAPIStatus[reportIndex].status
  const statusIndex = statuses.findIndex((status) => status === currentStatus)
  const nextStatus = statuses[statusIndex + 1]

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
  const report = { ...definitions.report }
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
      return Promise.resolve([{ field1: 57, field2: 1, field3: 12219380923, field4: '3 Freds'  }])
    case 'summary5':
      return Promise.resolve([{ field1: 'Percentageness', field2: '10%', field3: '20%', field4: '90%'  }])
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
