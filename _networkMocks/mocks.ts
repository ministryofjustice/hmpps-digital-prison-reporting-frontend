import { defaultMockRequest, generateNetworkMock, setupSimpleMock } from './generateNetworkMock'
import { summaries } from './definitionSummaries'

export const getDefinitionSummaries = setupSimpleMock('/definitions', summaries)

export const pollingEndpoint = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'POST',
    urlPathPattern: `/view-report/async/(report|dashboard)/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tblId_[0-9]+/(report|dashboard)`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      isExpired: false,
    },
  },
})

export const generateIndividualDefinitionSummaries =  
  summaries.map((summary) => 
    generateNetworkMock({
      ...defaultMockRequest,
      request: {
        ...defaultMockRequest.request,
        method: 'GET',
        urlPathPattern: `/definitions/${summary.id}`,
      },
      response: {
        ...defaultMockRequest.response,
        jsonBody: summary,
      },
    })
  )

export const mocks = [getDefinitionSummaries, ...generateIndividualDefinitionSummaries]
