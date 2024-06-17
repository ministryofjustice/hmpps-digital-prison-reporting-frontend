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

const happyStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED']
const sadStatuses = ['SUBMITTED', 'PICKED', 'STARTED', 'FAILED']

const getAsyncReportStatus = (token, reportId, variantId, executionId) => {
  const statuses = variantId === 'variantId-3' ? sadStatuses : happyStatuses
  const reportIndex = mockAPIStatus.findIndex((r) => r.executionId === executionId)
  const currentStatus = mockAPIStatus[reportIndex].status
  const statusIndex = statuses.findIndex((status) => status === currentStatus)
  const nextStatus = statuses[statusIndex + 1]
  if (nextStatus) {
    mockAPIStatus[reportIndex].status = nextStatus
  }
  return Promise.resolve({ status: mockAPIStatus[reportIndex].status })
}

const requestAsyncReport = (token, reportId, variantId, query) => {
  return new Promise((resolve) => {
    mockAPIStatus.push({ executionId: `exId_${variantId}`, status: 'redirect-call' })
    setTimeout(resolve, 1000, { executionId: `exId_${variantId}`, tableId: `tblId_${variantId}` })
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
