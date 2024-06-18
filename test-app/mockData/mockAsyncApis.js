/* eslint-disable prefer-destructuring */
const definitions = require('./mockReportDefinition')

const mockAPIStatus = []

const createMockData = (amount) => {
  return Array(amount)
    .fill(0)
    .map((_, i) => {
      return mockDataItem
    })
}

const mockDataItem = {
  field1: 'Value 1',
  field2: 'Value 2',
  field3: '2003-02-01T01:00',
  field4: 'Value 4',
  field5: 'Value 5',
  field6: '<a href="#" target="_blank">Value 6</a>',
}

const happyStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED', 400]
const sadStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FAILED']
const sadServerStatuses = ['SUBMITTED', 'PICKED', 500]

const getAsyncReportStatus = (token, reportId, variantId, executionId) => {
  let statuses
  switch (variantId) {
    case 'variantId-1':
      statuses = happyStatuses
      break
    case 'variantId-2':
      statuses = sadStatuses
      break
    case 'variantId-3':
      statuses = sadServerStatuses
      break
    default:
      break
  }

  const reportIndex = mockAPIStatus.findIndex((r) => r.executionId === executionId)
  const currentStatus = mockAPIStatus[reportIndex].status
  const statusIndex = statuses.findIndex((status) => status === currentStatus)
  const nextStatus = statuses[statusIndex + 1]
  if (nextStatus) {
    mockAPIStatus[reportIndex].status = nextStatus
  }
  const res = { status: mockAPIStatus[reportIndex].status }

  if (nextStatus === 'FAILED') {
    res.error = 'An error has occurred for some reason'
  }

  if (typeof nextStatus !== 'string') {
    res.userMessage = 'A server error has occurred for some reason'
  }

  return Promise.resolve(res)
}

const requestAsyncReport = (token, reportId, variantId, query) => {
  const unix = Date.now()
  return new Promise((resolve) => {
    mockAPIStatus.push({ executionId: `exId_${unix}`, status: 'redirect-call' })
    setTimeout(resolve, 1000, { executionId: `exId_${unix}`, tableId: `tblId_${unix}` })
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
  const pageSize = query.pageSize ? +query.pageSize : 10
  const report = createMockData(pageSize)
  return new Promise((resolve) => {
    resolve(report)
  })
}

const getAsyncCount = () => Promise.resolve(100)

module.exports = {
  getAsyncReportStatus,
  requestAsyncReport,
  getAsyncReport,
  getDefinition,
  getAsyncCount,
}
