import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as lineTimeseriesDefinition } from './definitions/definition'
import { definition as lineTimeseriesDefinitionDailyDataset } from './definitions/definition-granularity-daily'
import { definition as lineTimeseriesDefinitionMonthlyDataset } from './definitions/defintion-granularity-monthly'
import { definition as lineTimeseriesDefinitionYearlyDataset } from './definitions/definition-granularity-yearly'
import { definition as lineTimeseriesDefinitionInvalid } from './definitions/definition-invalid'
import { definition as lineTimeseriesDefinitionMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const lineTimeseriesDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinition.id}`,
  lineTimeseriesDefinition,
)

const lineTimeseriesDashboadDefinitionMergedDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinitionMergedDataset.id}`,
  lineTimeseriesDefinitionMergedDataset,
)

const lineTimeseriesDashboardDefinitionDailyDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinitionDailyDataset.id}`,
  lineTimeseriesDefinitionDailyDataset,
)

const lineTimeseriesDashboardDefinitionMonthlyDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinitionMonthlyDataset.id}`,
  lineTimeseriesDefinitionMonthlyDataset,
)

const lineTimeseriesDashboardDefinitionYearlyDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinitionYearlyDataset.id}`,
  lineTimeseriesDefinitionYearlyDataset,
)

const lineTimeseriesDashboardDefinitionInvalidMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinitionInvalid.id}`,
  lineTimeseriesDefinitionInvalid,
)

export const lineTimeseriesMocks = {
  lineTimeseriesDashboardDefinitionMock,
  lineTimeseriesDashboadDefinitionMergedDatasetMock,
  lineTimeseriesDashboardDefinitionDailyDatasetMock,
  lineTimeseriesDashboardDefinitionMonthlyDatasetMock,
  lineTimeseriesDashboardDefinitionYearlyDatasetMock,
  lineTimeseriesDashboardDefinitionInvalidMock,
}
