import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { mergedDataSet } from './data'
import { historicMergedData } from './data-historic'

import { allVisualisationDefinitions as vds } from '../../definitions/visualisations'

// ----------------------------------------------------------------------
// Defintions that require a merged dataset showing latest data
//

const lastestMergedDefinitionIds = [
  vds.listDashboardDefinitionInvalidMergedDataset,
  vds.barChartsDashboardDefinitionMergedDataset,
  vds.lineChartsDashboardDefinitionMergedDataset,
  vds.mixedChartsDashboardDefinitionMergedDataset,
].map(def => def.id)

// ----------------------------------------------------------------------
// Defintions that require a merged dataset showing latest data
//

const historicMergedDefinitionIds = [
  vds.listDashboardDefinitionInvalidMergedDatasetHistoric,
  vds.mixedChartsDashboardDefinitionMergedDatasetHistoric,
  vds.lineTimeseriesDashboardDefinitionMergedDataset,
].map(def => def.id)

// ----------------------------------------------------------------------
// DASHBOARD DATASET RESULT MOCKS
//

const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultMergedDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${lastestMergedDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  mergedDataSet,
  1,
)

export const dashboardResultMergedDataHistoricMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${historicMergedDefinitionIds.join('|')})/tables/tblId_[0-9]+/result`,
  historicMergedData,
  1,
)

export const mocks = [dashboardResultMergedDataMock, dashboardResultMergedDataHistoricMock]
