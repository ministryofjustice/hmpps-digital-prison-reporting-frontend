import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as doughnutCompleteDataset } from './definitions/definition'

const prefix = '/definitions/dashboard-visualisations/dashboards'

export const doughnutDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${doughnutCompleteDataset.id}`,
  doughnutCompleteDataset,
)

export const doughnutMocks = {
  doughnutDashboardDefinitionMock,
}
