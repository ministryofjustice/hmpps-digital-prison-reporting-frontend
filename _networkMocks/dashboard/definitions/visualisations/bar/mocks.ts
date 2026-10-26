import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition } from './definitions/definition'
import { definition as barMergedDataset } from './definitions/definition-merged'
import { definition as barInvalid } from './definitions/definition-invalid'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const barCompleteDatasetMock = setupSimpleMock(`${prefix}/${definition.id}`, definition)
const barPartialDatasetMock = setupSimpleMock(`${prefix}/${barMergedDataset.id}`, barMergedDataset)
const barInvalidMock = setupSimpleMock(`${prefix}/${barInvalid.id}`, barInvalid)

export const barMocks = {
  barCompleteDatasetMock,
  barPartialDatasetMock,
  barInvalidMock,
}
