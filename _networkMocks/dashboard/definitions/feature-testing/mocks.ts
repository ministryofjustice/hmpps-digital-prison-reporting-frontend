import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'
import {
  childDashboardOneDefinition,
  childDashboardTwoDefinition,
  parentChildDashboardDefinition,
} from './definition-parent-child'
import { definition as syncDefinition } from './definition-sync'

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

export const dashboardWithParentChildMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${parentChildDashboardDefinition.id}`,
  parentChildDashboardDefinition,
)

export const dashboardWithChildOneMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${childDashboardOneDefinition.id}`,
  childDashboardOneDefinition,
)

export const dashboardWithChildTwoMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${childDashboardTwoDefinition.id}`,
  childDashboardTwoDefinition,
)

export const mocks = [
  syncDashboardMock,
  featureFlagDashboardMock,
  dashboardWithLinksMock,
  dashboardWithParentChildMock,
  dashboardWithChildOneMock,
  dashboardWithChildTwoMock,
]
