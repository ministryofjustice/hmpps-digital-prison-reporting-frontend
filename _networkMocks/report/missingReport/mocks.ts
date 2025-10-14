import { defaultMockRequest, generateNetworkMock } from '@networkMocks/generateNetworkMock'

export const missingReportSubmitSuccessMock = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: `/missingRequest/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      userId: 'userId',
      reportId: 'feature-testing',
      reportVariantId: 'feature-testing-missing-1',
      reason: 'a reason',
      id: '123abc',
    },
  },
})

export const missingReportSubmitFailMock = generateNetworkMock({
  ...missingReportSubmitSuccessMock,
  response: {
    ...missingReportSubmitSuccessMock.response,
    status: 500,
    jsonBody: {},
  },
})

export const mocks = [missingReportSubmitFailMock, missingReportSubmitSuccessMock]
