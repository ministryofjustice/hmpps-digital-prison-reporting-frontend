import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as listCompleteDataset } from './definitions/definition'
import { definition as listCompleteDatasetHistoric } from './definitions/definition-historic'
import { definition as listInvalidDef } from './definitions/definition-invalid'
import { definition as listInvalidVisDef } from './definitions/definition-invalid-vis-defs'
import { definition as listMergedDataset } from './definitions/definition-merged'
import { definition as listMergedDatasetHistoric } from './definitions/definition-merged-historic'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const listCompleteDatasetMock = setupSimpleMock(`${prefix}/${listCompleteDataset.id}`, listCompleteDataset)
const listCompleteDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${listCompleteDatasetHistoric.id}`,
  listCompleteDatasetHistoric,
)
const listPartialDatasetMock = setupSimpleMock(`${prefix}/${listMergedDataset.id}`, listMergedDataset)
const listPartialDatasetHistoricMock = setupSimpleMock(
  `${prefix}/${listMergedDatasetHistoric.id}`,
  listMergedDatasetHistoric,
)
const listInvalidVisDefMock = setupSimpleMock(`${prefix}/${listInvalidVisDef.id}`, listInvalidVisDef)
const listInvalidDefMock = setupSimpleMock(`${prefix}/${listInvalidDef.id}`, listInvalidDef)

export const listMocks = {
  listCompleteDatasetMock,
  listCompleteDatasetHistoricMock,
  listPartialDatasetMock,
  listPartialDatasetHistoricMock,
  listInvalidVisDefMock,
  listInvalidDefMock,
}
