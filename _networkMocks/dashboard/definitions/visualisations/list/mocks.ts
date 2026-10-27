import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as listDashboardDefinition } from './definitions/definition'
import { definition as listDashboardDefinitionHistoric } from './definitions/definition-historic'
import { definition as listDashboardDefinitionInvalid } from './definitions/definition-invalid'
import { definition as listDashboardDefinitionInvalidVisDefinition } from './definitions/definition-invalid-vis-defs'
import { definition as listDashboardDefinitionMergedDataset } from './definitions/definition-merged'
import { definition as listDashboardDefinitionMergedDatasetHistoric } from './definitions/definition-merged-historic'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const listDashboardDefinitionMock = setupSimpleMock(`${prefix}/${listDashboardDefinition.id}`, listDashboardDefinition)
const listDashboardDefinitonHistoricMock = setupSimpleMock(
  `${prefix}/${listDashboardDefinitionHistoric.id}`,
  listDashboardDefinitionHistoric,
)
const listDashboardDefinitionMergedDatasetMock = setupSimpleMock(
  `${prefix}/${listDashboardDefinitionMergedDataset.id}`,
  listDashboardDefinitionMergedDataset,
)
const listDashboardDefintionMergedDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${listDashboardDefinitionMergedDatasetHistoric.id}`,
  listDashboardDefinitionMergedDatasetHistoric,
)
const listDashboardDefinitionInvalidVisDefMock = setupSimpleMock(
  `${prefix}/${listDashboardDefinitionInvalidVisDefinition.id}`,
  listDashboardDefinitionInvalidVisDefinition,
)
const listDashboardDefinitionInvalidMock = setupSimpleMock(
  `${prefix}/${listDashboardDefinitionInvalid.id}`,
  listDashboardDefinitionInvalid,
)

export const listMocks = {
  listDashboardDefinitionMock,
  listDashboardDefinitonHistoricMock,
  listDashboardDefinitionMergedDatasetMock,
  listDashboardDefintionMergedDatasetHistoricMock,
  listDashboardDefinitionInvalidVisDefMock,
  listDashboardDefinitionInvalidMock,
}
