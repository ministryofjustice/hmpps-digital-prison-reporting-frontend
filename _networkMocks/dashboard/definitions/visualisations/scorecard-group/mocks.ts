import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as scorecardGroupDashboardDefinition } from './definitions/definition'
import { definition as scorecardGroupDashboardDefinitionInvalid } from './definitions/definition-invalid'
import { definition as scorecardGroupDashboardDefinitionNoTs } from './definitions/definiton-no-ts'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const scorecardGroupDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${scorecardGroupDashboardDefinition.id}`,
  scorecardGroupDashboardDefinition,
)

const scorecardGroupDashboardDefinitionInvalidMock = setupSimpleMock(
  `${prefix}/${scorecardGroupDashboardDefinitionInvalid.id}`,
  scorecardGroupDashboardDefinitionInvalid,
)

const scorecardGroupDashboardDefinitionNoTsMock = setupSimpleMock(
  `${prefix}/${scorecardGroupDashboardDefinitionNoTs.id}`,
  scorecardGroupDashboardDefinitionNoTs,
)

export const scorecardGroupMocks = {
  scorecardGroupDashboardDefinitionMock,
  scorecardGroupDashboardDefinitionInvalidMock,
  scorecardGroupDashboardDefinitionNoTsMock,
}
