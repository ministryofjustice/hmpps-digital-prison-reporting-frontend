import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as doughnutDefinition } from './definitions/definition'

const prefix = '/definitions/dashboard-visualisations/dashboards'

export const doughnutDashboardDefinitionMock = setupSimpleMock(`${prefix}/${doughnutDefinition.id}`, doughnutDefinition)

export const doughnutMocks = {
  doughnutDashboardDefinitionMock,
}
