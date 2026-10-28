import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as lineChartsDefinition } from './definitions/definition'
import { definition as lineChartsDefinitionInvalid } from './definitions/definition-invalid'
import { definition as lineChartsMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

export const lineDashboardDefinitionMock = setupSimpleMock(`${prefix}/${lineChartsDefinition.id}`, lineChartsDefinition)
export const lineDashboardDefinitionMergedDatasetMock = setupSimpleMock(
  `${prefix}/${lineChartsMergedDataset.id}`,
  lineChartsMergedDataset,
)
export const lineInvalidDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${lineChartsDefinitionInvalid.id}`,
  lineChartsDefinitionInvalid,
)

export const lineMocks = {
  lineDashboardDefinitionMock,
  lineDashboardDefinitionMergedDatasetMock,
  lineInvalidDashboardDefinitionMock,
}
