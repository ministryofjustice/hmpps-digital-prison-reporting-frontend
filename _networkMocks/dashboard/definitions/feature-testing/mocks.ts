import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as syncDefinition } from './definition-sync'
import { definition as definitionFeatureFlag } from './definition-feature-flag'

const productId = 'feature-testing'

export const syncDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${syncDefinition.id}`,
  syncDefinition,
)

export const featureFlagDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${definitionFeatureFlag.id}`,
  definitionFeatureFlag,
)

export const mocks = [syncDashboardMock, featureFlagDashboardMock]
