import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as lineTimeseriesCompleteDataset } from './definitions/definition'
import { definition as lineTimeseriesDailyDataset } from './definitions/definition-granularity-daily'
import { definition as lineTimeseriesMonthlyDataset } from './definitions/defintion-granularity-monthly'
import { definition as lineTimeseriesYearlyDataset } from './definitions/definition-granularity-yearly'
import { definition as lineTimeseriesInvalid } from './definitions/definition-invalid'
import { definition as lineTimeseriesMergedDataset } from './definitions/definition-merged'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const lineTimeseriesCompleteDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesCompleteDataset.id}`,
  lineTimeseriesCompleteDataset,
)

const lineTimeseriesPartialDatasetMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesMergedDataset.id}`,
  lineTimeseriesMergedDataset,
)

const lineTimeseriesDailyDatasetDefinitionMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesDailyDataset.id}`,
  lineTimeseriesDailyDataset,
)

const lineTimeseriesMonthlyDatasetDefinitionMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesMonthlyDataset.id}`,
  lineTimeseriesMonthlyDataset,
)

const lineTimeseriesYearlyDatasetDefinitionMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesYearlyDataset.id}`,
  lineTimeseriesYearlyDataset,
)

const lineTimeseriesInvalidtDefinitionMock = setupSimpleMock(
  `${prefix}/${lineTimeseriesInvalid.id}`,
  lineTimeseriesInvalid,
)

export const lineTimeseriesMocks = {
  lineTimeseriesCompleteDatasetMock,
  lineTimeseriesPartialDatasetMock,
  lineTimeseriesDailyDatasetDefinitionMock,
  lineTimeseriesMonthlyDatasetDefinitionMock,
  lineTimeseriesYearlyDatasetDefinitionMock,
  lineTimeseriesInvalidtDefinitionMock,
}
