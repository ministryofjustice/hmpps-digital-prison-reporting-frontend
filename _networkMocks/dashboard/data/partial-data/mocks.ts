import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { partialDataSet } from './data'
import { historicPartialData } from './data-historic'

import { allVisualisationDefinitions as vds } from '../../definitions/visualisations'

// ----------------------------------------------------------------------
// Defintions that require a merged dataset showing latest data
//

const lastestMergedDefinitionIds = [
  vds.listMergedDefinition,
  vds.barChartsDefinitionMerged,
  vds.lineDefinitionMerged,
  vds.mixedDefinitionMerged,
].map(def => def.id)

// ----------------------------------------------------------------------
// Defintions that require a merged dataset showing latest data
//

const historicMergedDefinitionIds = [
  vds.listMergedDefinitionHistoric,
  vds.mixedDefinitionMergedHistoric,
  vds.linetimeseriesDefinitionMerged,
].map(def => def.id)

// ----------------------------------------------------------------------
// DASHBOARD DATASET RESULT MOCKS
//

const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultPartialDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${lastestMergedDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  partialDataSet,
  1,
)

export const dashboardResultPartialDataHistoricMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${historicMergedDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  historicPartialData,
  1,
)

export const mocks = [dashboardResultPartialDataMock, dashboardResultPartialDataHistoricMock]
