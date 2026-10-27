import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import {
  annuallyDefinition as matrixCompleteAnnuallyDataset,
  autoBucketedDefinition as matrixCompleteAutoBucketedDataset,
  bucketedDefinition as matrixCompleteBucketedDataset,
  definition as matrixCompleteDataset,
  monthlyDefinition as matrixCompleteMonthlyDataset,
} from './definitions/definition'
import { definition as matrixInvalid } from './definitions/definition-invalid'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const matrixDashboardDefinitionDailyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteDataset.id}`,
  matrixCompleteDataset,
)

const matrixDashboardDefinitionMonthlyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteMonthlyDataset.id}`,
  matrixCompleteMonthlyDataset,
)

const matrixDashboardDefinitionAnnuallyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteAnnuallyDataset.id}`,
  matrixCompleteAnnuallyDataset,
)

const matrixDashboardDefinitionAutoBucketedDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteAutoBucketedDataset.id}`,
  matrixCompleteAutoBucketedDataset,
)

const matrixDashboardDefinitionBucketedDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteBucketedDataset.id}`,
  matrixCompleteBucketedDataset,
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
