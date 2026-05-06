import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as syncDefinition } from './definition-sync'
import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'

const productId = 'feature-testing'

export const syncDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${syncDefinition.id}`,
  syncDefinition,
)

export const featureFlagDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${definitionFeatureFlag.id}`,
  definitionFeatureFlag,
)

export const dashboardWithLinksMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${definitionWithLinks.id}`,
  definitionWithLinks,
)

export const mocks = [syncDashboardMock, featureFlagDashboardMock, dashboardWithLinksMock]
