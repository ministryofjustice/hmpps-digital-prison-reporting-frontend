import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import {
  annuallyDefinition as matrixChartsDefinitionAnnuallyDataset,
  autoBucketedDefinition as matrixChartsDefinitionAutoBucketedDataset,
  bucketedDefinition as matrixChartsDefinitionBucketedDataset,
  definition as matrixChartsDefinitionDataset,
  monthlyDefinition as matrixChartsDefinitionMonthlyDataset,
} from './definitions/definition'
import { definition as matrixInvalid } from './definitions/definition-invalid'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const matrixDashboardDefinitionDailyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixChartsDefinitionDataset.id}`,
  matrixChartsDefinitionDataset,
)

const matrixDashboardDefinitionMonthlyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixChartsDefinitionMonthlyDataset.id}`,
  matrixChartsDefinitionMonthlyDataset,
)

const matrixDashboardDefinitionAnnuallyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixChartsDefinitionAnnuallyDataset.id}`,
  matrixChartsDefinitionAnnuallyDataset,
)

const matrixDashboardDefinitionAutoBucketedDatasetMock = setupSimpleMock(
  `${prefix}/${matrixChartsDefinitionAutoBucketedDataset.id}`,
  matrixChartsDefinitionAutoBucketedDataset,
)

const matrixDashboardDefinitionBucketedDatasetMock = setupSimpleMock(
  `${prefix}/${matrixChartsDefinitionBucketedDataset.id}`,
  matrixChartsDefinitionBucketedDataset,
)

const matrixDashboardDefinitionInvalidMock = setupSimpleMock(`${prefix}/${matrixInvalid.id}`, matrixInvalid)

export const matrixMocks = {
  matrixDashboardDefinitionDailyDatasetMock,
  matrixDashboardDefinitionMonthlyDatasetMock,
  matrixDashboardDefinitionAnnuallyDatasetMock,
  matrixDashboardDefinitionAutoBucketedDatasetMock,
  matrixDashboardDefinitionBucketedDatasetMock,
  matrixDashboardDefinitionInvalidMock,
}
