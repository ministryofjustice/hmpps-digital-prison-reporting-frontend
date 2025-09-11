import superagent from 'superagent'

export const defaultMockRequest = {
  request: {
    method: 'GET',
  },
  response: {
    status: 200,
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    fixedDelayMilliseconds: 0,
  }
} as const

type CompleteMockRequest = {
  request: {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS',
    queryParameters?: object | undefined,
    bodyPatterns?: Array<object> | undefined,
    urlPathPattern: string
  }
  response: {
    status: number
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    jsonBody: object
    fixedDelayMilliseconds: number
  }
}

export const setupSimpleMock = (urlPathPattern: string, jsonBody: object): CompleteMockRequest => {
  return {
    request: {
      ...defaultMockRequest.request,
      urlPathPattern,
    },
    response: {
      ...defaultMockRequest.response,
      jsonBody,
    }
  }
}

export const generateNetworkMock = (mockRequest: CompleteMockRequest) => ({
  request: {
    ...defaultMockRequest.request,
    ...mockRequest.request
  },
  response: {
    ...defaultMockRequest.response,
    ...mockRequest.response,
  }
})

export const reportIdRegex = `[a-zA-Z0-9-_]+`

export const postNetworkMocks = async (mockRequests: CompleteMockRequest[]) => {
  return await Promise.all(mockRequests.map(async (mock) => await superagent.post(`http://localhost:9091/__admin/mappings`).send(mock)))
}