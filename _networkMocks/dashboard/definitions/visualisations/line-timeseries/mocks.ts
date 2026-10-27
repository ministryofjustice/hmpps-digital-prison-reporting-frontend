import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as lineTimeseriesCompleteDataset } from './definitions/definition'
import { definition as lineTimeseriesDailyDataset } from './definitions/definition-granularity-daily'
import { definition as lineTimeseriesMonthlyDataset } from './definitions/defintion-granularity-monthly'
import { definition as lineTimeseriesYearlyDataset } from './definitions/definition-granularity-yearly'
import { definition as lineTimeseriesInvalid } from './definitions/definition-invalid'
import { definition as lineTimeseriesMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const lineTimeseriesDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesCompleteDataset.id}`,
  lineTimeseriesCompleteDataset,
)

const lineTimeseriesDashboadDefinitionMergedDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesMergedDataset.id}`,
  lineTimeseriesMergedDataset,
)

const lineTimeseriesDashboardDefinitionDailyDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDailyDataset.id}`,
  lineTimeseriesDailyDataset,
)

const lineTimeseriesDashboardDefinitionMonthlyDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesMonthlyDataset.id}`,
  lineTimeseriesMonthlyDataset,
)

const lineTimeseriesDashboardDefinitionYearlyDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesYearlyDataset.id}`,
  lineTimeseriesYearlyDataset,
)

const lineTimeseriesDashboardDefinitionInvalidMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesInvalid.id}`,
  lineTimeseriesInvalid,
)

export const lineTimeseriesMocks = {
  lineTimeseriesDashboardDefinitionMock,
  lineTimeseriesDashboadDefinitionMergedDatasetMock,
  lineTimeseriesDashboardDefinitionDailyDatasetMock,
  lineTimeseriesDashboardDefinitionMonthlyDatasetMock,
  lineTimeseriesDashboardDefinitionYearlyDatasetMock,
  lineTimeseriesDashboardDefinitionInvalidMock,
}
