/* eslint-disable no-param-reassign */
const mockStatusApiResponse = require('./reports/mockStatusApiReponse')
const mockStatusApiError = require('./reports/mockStatusResponseError')

const mockStatusSequence = {
  happyStatuses: ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED'],
  sadStatuses: ['SUBMITTED', 'PICKED', 'STARTED', 'FAILED'],
  sadServerStatuses: ['SUBMITTED', 'PICKED', 500],
  expiredStatuses: ['SUBMITTED', 'PICKED', 'STARTED', 'FINISHED', 'READY', 500],
  timedOutStatuses: new Array(500).fill('STARTED'),
}

const mockStatusHelper = async (requestsStore, statuses, executionId) => {
  const mockResponse = Object.assign(mockStatusApiResponse, {})

  let reportIndex = requestsStore.findIndex((r) => r.executionId === executionId)
  if (reportIndex === -1) reportIndex = 0

  const currentStatus = requestsStore[reportIndex].status
  const currentStatusIndex = statuses.findIndex((status) => status === currentStatus)
  const nextStatus =
    statuses.length > currentStatusIndex + 1 ? statuses[currentStatusIndex + 1] : statuses[currentStatusIndex]

  if (nextStatus) {
    requestsStore[reportIndex].status = nextStatus
  }
  mockResponse.status = requestsStore[reportIndex].status

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

module.exports = {
  mockStatusSequence,
  mockStatusHelper,
}
