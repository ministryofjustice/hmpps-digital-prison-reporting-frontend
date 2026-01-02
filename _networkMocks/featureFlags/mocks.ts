import { ListFlagsResponse } from '@flipt-io/flipt'
import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

export const getFlagsMockEnabled = setupSimpleMock(`/api/v1/namespaces/[a-zA-Z0-9-_]+/flags`, {
  flags: [
    {
      key: 'saveDefaultsEnabled',
      name: 'Save filter defaults enabled',
      enabled: true,
      namespaceKey: 'hmpps-digital-prison-reporting',
      type: 'BOOLEAN_FLAG_TYPE',
    },
  ],
  totalCount: 1,
} as ListFlagsResponse)

export const getFlagsMockEmpty = setupSimpleMock(`/api/v1/namespaces/[a-zA-Z0-9-_]+/flags`, {
  flags: [],
  totalCount: 0,
  nextPageToken: '',
} as ListFlagsResponse)

export const getFlagsMockDisabled = setupSimpleMock(`/api/v1/namespaces/[a-zA-Z0-9-_]+/flags`, {
  flags: [
    {
      key: 'saveDefaultsEnabled',
      name: 'Save filter defaults enabled',
      enabled: false,
      namespaceKey: 'hmpps-digital-prison-reporting',
      type: 'BOOLEAN_FLAG_TYPE',
    },
  ],
  totalCount: 1,
} as ListFlagsResponse)

export const mocks = [getFlagsMockEnabled]
