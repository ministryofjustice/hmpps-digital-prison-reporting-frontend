import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as lineTimeseriesDefinition } from './definitions/definition'
import { definition as lineTimeseriesDefinitionDailyDataset } from './definitions/definition-granularity-daily'
import { definition as lineTimeseriesDefinitionMonthlyDataset } from './definitions/definition-granularity-monthly'
import { definition as lineTimeseriesDefinitionYearlyDataset } from './definitions/definition-granularity-yearly'
import { definition as lineTimeseriesDefinitionInvalid } from './definitions/definition-invalid'
import { definition as lineTimeseriesDefinitionMergedDataset } from './definitions/definition-merged'
import { definition as lineTimeseriesDefinitionBadData } from './definitions/definition-bad-data'

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

const lineTimeseriesDashboardDefinitionBadDataMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDefinitionBadData.id}`,
  lineTimeseriesDefinitionBadData,
)

export const lineTimeseriesMocks = {
  lineTimeseriesDashboardDefinitionMock,
  lineTimeseriesDashboadDefinitionMergedDatasetMock,
  lineTimeseriesDashboardDefinitionDailyDatasetMock,
  lineTimeseriesDashboardDefinitionMonthlyDatasetMock,
  lineTimeseriesDashboardDefinitionYearlyDatasetMock,
  lineTimeseriesDashboardDefinitionInvalidMock,
  lineTimeseriesDashboardDefinitionBadDataMock,
}
