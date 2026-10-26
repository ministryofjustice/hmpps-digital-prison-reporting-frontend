import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as lineCompleteDataset } from './definitions/definition'
import { definition as lineInvalid } from './definitions/definition-invalid'
import { definition as lineMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

export const lineCompleteDatasetMock = setupSimpleMock(`${prefix}/${lineCompleteDataset.id}`, lineCompleteDataset)
export const linePartialDatasetMock = setupSimpleMock(`${prefix}/${lineMergedDataset.id}`, lineMergedDataset)
export const lineInvalidDefinitionMock = setupSimpleMock(`${prefix}/${lineInvalid.id}`, lineInvalid)

export const lineMocks = {
  lineCompleteDatasetMock,
  linePartialDatasetMock,
  lineInvalidDefinitionMock,
}
