import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as doughnutChartsDefinition } from './definitions/definition'
import { definition as doughnutChartsDefinitionInvalid } from './definitions/definition-invalid'

const prefix = '/definitions/dashboard-visualisations/dashboards'

export const doughnutDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${doughnutChartsDefinition.id}`,
  doughnutChartsDefinition,
)

export const doughnutDashboardDefinitionInvalidMock = setupSimpleMock(
  `${prefix}/${doughnutChartsDefinitionInvalid.id}`,
  doughnutChartsDefinitionInvalid,
)

export const doughnutMocks = {
  doughnutDashboardDefinitionMock,
  doughnutDashboardDefinitionInvalidMock,
}
