import { Flag, ListFlagsResponse } from '@flipt-io/flipt'
import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

const generateDefaultBooleanFlag = (
  key: string,
  enabled: boolean,
  metadata: Record<string, string | boolean | number> = {},
): Flag => ({
  key,
  enabled,
  name: '',
  namespaceKey: 'hmpps-digital-prison-reporting',
  type: 'BOOLEAN_FLAG_TYPE',
  description: '',
  createdAt: '',
  updatedAt: '',
  variants: [],
  metadata,
})

export const getFlagsMockEnabled = setupSimpleMock(`/api/v1/namespaces/[a-zA-Z0-9-_]+/flags`, {
  flags: [
    generateDefaultBooleanFlag('saveDefaultsEnabled', true),
    generateDefaultBooleanFlag('barChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('lineChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('donutChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('scorecardChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('scorecardgroupChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('matrixtimeseriesChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('bartimeseriesChartsEnabled', true, { dashboardFeature: true }),
    generateDefaultBooleanFlag('linetimeseriesChartsEnabled', true, { dashboardFeature: true }),
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
    generateDefaultBooleanFlag('saveDefaultsEnabled', false),
    generateDefaultBooleanFlag('barChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('lineChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('donutChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('scorecardChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('scorecardgroupChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('matrixtimeseriesChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('bartimeseriesChartsEnabled', false, { dashboardFeature: true }),
    generateDefaultBooleanFlag('linetimeseriesChartsEnabled', false, { dashboardFeature: true }),
  ],
  totalCount: 1,
} as ListFlagsResponse)

export const mocks = [getFlagsMockEnabled]
