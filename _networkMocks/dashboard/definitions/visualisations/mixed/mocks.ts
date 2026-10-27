import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as mixedCompleteDataset } from './definitions/definition'
import { definition as mixedMergedDatasetHistoric } from './definitions/definition-merged-historic'
import { definition as mixedMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const mixedDashboardDefinitionMock = setupSimpleMock(`${prefix}/${mixedCompleteDataset.id}`, mixedCompleteDataset)
const mixedDashboardDefinitionMergedMock = setupSimpleMock(`${prefix}/${mixedMergedDataset.id}`, mixedMergedDataset)
const mixedDashboardDefinitionMergedDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${mixedMergedDatasetHistoric.id}`,
  mixedMergedDatasetHistoric,
)

export const mixedMocks = {
  mixedDashboardDefinitionMock,
  mixedDashboardDefinitionMergedMock,
  mixedDashboardDefinitionMergedDatasetHistoricMock,
}
