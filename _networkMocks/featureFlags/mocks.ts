import { defaultMockRequest, generateNetworkMock } from '@networkMocks/generateNetworkMock'

const FEATURE_FLAG_NAMESPACE = 'hmpps-digital-prison-reporting'
const snapshotEndpoint = `/internal/v1/evaluation/snapshot/namespace/${FEATURE_FLAG_NAMESPACE}`

interface FeatureFlagSnapshotResponse {
  namespace: {
    key: string
  }
  flags: Array<{
    key: string
    name: string
    type: 'BOOLEAN_FLAG_TYPE'
    enabled: boolean
  }>
}

const booleanFlag = (key: string, enabled: boolean) => ({
  key,
  name: key,
  type: 'BOOLEAN_FLAG_TYPE' as const,
  enabled,
})

const createSnapshotResponse = (enabled: boolean): FeatureFlagSnapshotResponse => ({
  namespace: {
    key: FEATURE_FLAG_NAMESPACE,
  },
  flags: [
    booleanFlag('saveDefaultsEnabled', enabled),
    booleanFlag('streamingDownloadEnabled', enabled),
    booleanFlag('barChartsEnabled', enabled),
    booleanFlag('lineChartsEnabled', enabled),
    booleanFlag('donutChartsEnabled', enabled),
    booleanFlag('scorecardChartsEnabled', enabled),
    booleanFlag('scorecardgroupChartsEnabled', enabled),
    booleanFlag('matrixtimeseriesChartsEnabled', enabled),
    booleanFlag('bartimeseriesChartsEnabled', enabled),
    booleanFlag('linetimeseriesChartsEnabled', enabled),
  ],
})

export const getFlagsMockEnabled = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    method: 'GET',
    urlPathPattern: snapshotEndpoint,
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: createSnapshotResponse(true),
  },
})

export const getFlagsMockEmpty = generateNetworkMock({
  ...getFlagsMockEnabled,
  response: {
    ...getFlagsMockEnabled.response,
    jsonBody: {
      namespace: {
        key: FEATURE_FLAG_NAMESPACE,
      },
      flags: [],
    } as FeatureFlagSnapshotResponse,
  },
})

export const getFlagsMockDisabled = generateNetworkMock({
  ...getFlagsMockEnabled,
  response: {
    ...getFlagsMockEnabled.response,
    jsonBody: createSnapshotResponse(false),
  },
})

export const mocks = [getFlagsMockEnabled]
