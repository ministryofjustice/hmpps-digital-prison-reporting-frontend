import superagent, { SuperAgentRequest } from 'superagent'

export const defaultMockRequest = {
  priority: 5,
  request: {
    method: 'GET',
  },
  response: {
    status: 200,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    fixedDelayMilliseconds: 0,
  },
} as const

type CompleteMockRequest = {
  priority: number
  request: {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS'
    queryParameters?: object | undefined
    bodyPatterns?: Array<object> | undefined
    urlPathPattern: string
  }
  response: {
    status: number
    headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    jsonBody: object
    fixedDelayMilliseconds: number
  }
}

export const setupSimpleMock = (urlPathPattern: string, jsonBody: object, priority?: number): CompleteMockRequest => {
  return {
    priority: priority || 0,
    request: {
      ...defaultMockRequest.request,
      urlPathPattern,
    },
    response: {
      ...defaultMockRequest.response,
      jsonBody,
    },
  }
}

export const setupSimpleFailedMock = (urlPathPattern: string, status: number = 500, jsonBody: object = {}, priority?: number): CompleteMockRequest => {
  return {
    priority: priority || 0,
    request: {
      ...defaultMockRequest.request,
      urlPathPattern,
    },
    response: {
      ...defaultMockRequest.response,
      jsonBody,
      status
    },
  }
}

export const generateNetworkMock = (mockRequest: CompleteMockRequest) => ({
  ...mockRequest,
  request: {
    ...defaultMockRequest.request,
    ...mockRequest.request,
  },
  response: {
    ...defaultMockRequest.response,
    ...mockRequest.response,
  },
})

export const reportIdRegex = `[a-zA-Z0-9-_]+`

const wiremockUrl = 'http://localhost:9091/__admin'
export const stubFor = (mapping: Record<string, unknown>): SuperAgentRequest =>
  superagent.post(`${wiremockUrl}/mappings`).send(mapping)

export const postNetworkMocks = async (mockRequests: CompleteMockRequest[]) => {
  return Promise.all(mockRequests.map(async (mock) => stubFor(mock)))
}
