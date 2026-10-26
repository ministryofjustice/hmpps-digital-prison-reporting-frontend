import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as mixedCompleteDataset } from './definitions/definition'
import { definition as mixedMergedDatasetHistoric } from './definitions/definition-merged-historic'
import { definition as mixedMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const mixedCompleteDatasetMock = setupSimpleMock(`${prefix}/${mixedCompleteDataset.id}`, mixedCompleteDataset)
const mixedPartialDatasetMock = setupSimpleMock(`${prefix}/${mixedMergedDataset.id}`, mixedMergedDataset)
const mixedPartialDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${mixedMergedDatasetHistoric.id}`,
  mixedMergedDatasetHistoric,
)

export const mixedMocks = {
  mixedCompleteDatasetMock,
  mixedPartialDatasetMock,
  mixedPartialDatasetHistoricMock,
}
