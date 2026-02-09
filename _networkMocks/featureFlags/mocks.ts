import { defaultMockRequest, generateNetworkMock } from '@networkMocks/generateNetworkMock'

const batchEndpoint = '/evaluate/v1/batch'
const responseTemplate = {
  requestId: 'request-id',
  requestDurationMillis: 1,
}

interface BatchEvaluationResponse {
  requestId: string
  requestDurationMillis: number
  responses: Array<{
    type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE'
    booleanResponse: {
      enabled: boolean
      flagKey: string
      reason: 'MATCH_EVALUATION_REASON'
      segmentKeys: string[]
      requestDurationMillis: number
      timestamp: string
    }
  }>
}

const defaultBooleanResponse = (key: string, enabled: boolean) => ({
  type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE' as const,
  booleanResponse: {
    enabled,
    flagKey: key,
    reason: 'MATCH_EVALUATION_REASON' as const,
    segmentKeys: [],
    requestDurationMillis: 1,
    timestamp: '2024-01-01T00:00:00Z',
  },
})

const createBatchResponse = (enabled: boolean): BatchEvaluationResponse => ({
  ...responseTemplate,
  responses: [
    defaultBooleanResponse('saveDefaultsEnabled', enabled),
    defaultBooleanResponse('streamingDownloadEnabled', enabled),
    defaultBooleanResponse('barChartsEnabled', enabled),
    defaultBooleanResponse('lineChartsEnabled', enabled),
    defaultBooleanResponse('donutChartsEnabled', enabled),
    defaultBooleanResponse('scorecardChartsEnabled', enabled),
    defaultBooleanResponse('scorecardgroupChartsEnabled', enabled),
    defaultBooleanResponse('matrixtimeseriesChartsEnabled', enabled),
    defaultBooleanResponse('bartimeseriesChartsEnabled', enabled),
    defaultBooleanResponse('linetimeseriesChartsEnabled', enabled),
  ],
})

export const getFlagsMockEnabled = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: batchEndpoint,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: createBatchResponse(true),
  },
})

export const getFlagsMockEmpty = generateNetworkMock({
  ...getFlagsMockEnabled,
  response: {
    ...getFlagsMockEnabled.response,
    jsonBody: {
      ...responseTemplate,
      responses: [],
    } as BatchEvaluationResponse,
  },
})

export const getFlagsMockDisabled = generateNetworkMock({
  ...getFlagsMockEnabled,
  response: {
    ...getFlagsMockEnabled.response,
    jsonBody: createBatchResponse(false),
  },
})

export const mocks = [getFlagsMockEnabled]
