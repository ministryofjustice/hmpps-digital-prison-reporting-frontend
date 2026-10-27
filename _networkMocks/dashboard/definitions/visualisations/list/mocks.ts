import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as listCompleteDataset } from './definitions/definition'
import { definition as listCompleteDatasetHistoric } from './definitions/definition-historic'
import { definition as listInvalidDef } from './definitions/definition-invalid'
import { definition as listInvalidVisDef } from './definitions/definition-invalid-vis-defs'
import { definition as listMergedDataset } from './definitions/definition-merged'
import { definition as listMergedDatasetHistoric } from './definitions/definition-merged-historic'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const listDashboardDefinitionMock = setupSimpleMock(`${prefix}/${listCompleteDataset.id}`, listCompleteDataset)
const listDashboardDefinitonHistoricMock = setupSimpleMock(
  `${prefix}/${listCompleteDatasetHistoric.id}`,
  listCompleteDatasetHistoric,
)
const listDashboardDefinitionMergedDatasetMock = setupSimpleMock(`${prefix}/${listMergedDataset.id}`, listMergedDataset)
const listDashboardDefintionMergedDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${listMergedDatasetHistoric.id}`,
  listMergedDatasetHistoric,
)
const listDashboardDefinitionInvalidVisDefMock = setupSimpleMock(`${prefix}/${listInvalidVisDef.id}`, listInvalidVisDef)
const listDashboardDefinitionInvalidMock = setupSimpleMock(`${prefix}/${listInvalidDef.id}`, listInvalidDef)

export const listMocks = {
  listDashboardDefinitionMock,
  listDashboardDefinitonHistoricMock,
  listDashboardDefinitionMergedDatasetMock,
  listDashboardDefintionMergedDatasetHistoricMock,
  listDashboardDefinitionInvalidVisDefMock,
  listDashboardDefinitionInvalidMock,
}
