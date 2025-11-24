import { ListFlagsResponse } from "@flipt-io/flipt";
import { setupSimpleMock } from "@networkMocks/generateNetworkMock";

export const getFlagsMockEnabled = setupSimpleMock(`/api/v1/namespaces/[a-zA-Z0-9-_]+/flags`, {
  flags: [{
    key: 'productCollections',
    name: 'Product Collections Enabled',
    enabled: true,
    namespaceKey: 'hmpps-digital-prison-reporting-dev',
    type: 'BOOLEAN_FLAG_TYPE',
  }],
  totalCount: 1
} as ListFlagsResponse)

export const getFlagsMockEmpty = setupSimpleMock(`/api/v1/namespaces/[a-zA-Z0-9-_]+/flags`, {
  flags: [],
  totalCount: 0
} as ListFlagsResponse)

export const mocks = [getFlagsMockEmpty, getFlagsMockEnabled]