import { defaultMockRequest, generateNetworkMock } from "@networkMocks/generateNetworkMock"
import { summaries } from '../definitionSummaries'

export const getCatalogueCollections = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/catalogueCollections`
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [{
      id: 'cata-id-123',
      name: 'My Starter Pack',
    }, {
      id: 'cata-id-456',
      name: 'Other collection',
    }]
  }
})

export const getCatalogueCollection1 = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/catalogueCollection/cata-id-123`
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [{
      id: 'cata-id-123',
      name: 'My Starter Pack',
      summaries: [summaries[0], summaries[1]],
    }]
  }
})

export const getCatalogueCollection2 = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/catalogueCollection/cata-id-456`
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [{
      id: 'cata-id-123',
      name: 'My Starter Pack',
      summaries: [summaries[2], summaries[3]],
    }]
  }
})

export const mocks = [getCatalogueCollections, getCatalogueCollection1, getCatalogueCollection2]
