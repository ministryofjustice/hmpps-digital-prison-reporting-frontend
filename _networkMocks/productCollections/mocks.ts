import { defaultMockRequest, generateNetworkMock } from '@networkMocks/generateNetworkMock'
import { summaries } from '../definitionSummaries'

export const getProductCollections = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/productCollections`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: [
      {
        id: 'cata-id-123',
        name: 'My Starter Pack',
      },
      {
        id: 'cata-id-456',
        name: 'Other collection',
      },
    ],
  },
})

export const getProductCollection1 = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/productCollections/cata-id-123`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      id: 'cata-id-123',
      name: 'My Starter Pack',
      products: [{ productId: summaries[0].id }, { productId: summaries[1].id }],
    },
  },
})

export const getProductCollection2 = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/productCollections/cata-id-456`,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: {
      id: 'cata-id-123',
      name: 'My Starter Pack',
      products: [{ productId: summaries[2].id }, { productId: summaries[3].id }],
    },
  },
})

export const mocks = [getProductCollections, getProductCollection1, getProductCollection2]
