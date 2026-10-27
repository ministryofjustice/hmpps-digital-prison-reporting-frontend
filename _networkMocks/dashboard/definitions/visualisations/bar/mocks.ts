import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition } from './definitions/definition'
import { definition as barMergedDataset } from './definitions/definition-merged'
import { definition as barInvalid } from './definitions/definition-invalid'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const barDashboardDefinitionMock = setupSimpleMock(`${prefix}/${definition.id}`, definition)
const barDashboardDefinitionMergedDatasetMock = setupSimpleMock(`${prefix}/${barMergedDataset.id}`, barMergedDataset)
const barDashboardDefinitionInvalidMock = setupSimpleMock(`${prefix}/${barInvalid.id}`, barInvalid)

export const barMocks = {
  barDashboardDefinitionMock,
  barDashboardDefinitionMergedDatasetMock,
  barDashboardDefinitionInvalidMock,
}
