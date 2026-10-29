import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as mixedChartsDefinitionDataset } from './definitions/definition'
import { definition as mixedChartsDefinitionMergedDatasetHistoric } from './definitions/definition-merged-historic'
import { definition as mixedChartsDefinitionMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const mixedDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${mixedChartsDefinitionDataset.id}`,
  mixedChartsDefinitionDataset,
)
const mixedDashboardDefinitionMergedMock = setupSimpleMock(
  `${prefix}/${mixedChartsDefinitionMergedDataset.id}`,
  mixedChartsDefinitionMergedDataset,
)
const mixedDashboardDefinitionMergedDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${mixedChartsDefinitionMergedDatasetHistoric.id}`,
  mixedChartsDefinitionMergedDatasetHistoric,
)

export const mixedMocks = {
  mixedDashboardDefinitionMock,
  mixedDashboardDefinitionMergedMock,
  mixedDashboardDefinitionMergedDatasetHistoricMock,
}
