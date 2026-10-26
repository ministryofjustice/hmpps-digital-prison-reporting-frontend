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

const matrixCompleteDailyDatasetMock = setupSimpleMock(`${prefix}/${matrixCompleteDataset.id}`, matrixCompleteDataset)

const matrixCompleteMonthlyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteMonthlyDataset.id}`,
  matrixCompleteMonthlyDataset,
)

const matrixCompleteAnnuallyDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteAnnuallyDataset.id}`,
  matrixCompleteAnnuallyDataset,
)

const matrixCompleteAutoBucketedDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteAutoBucketedDataset.id}`,
  matrixCompleteAutoBucketedDataset,
)

const matrixCompleteBucketedDatasetMock = setupSimpleMock(
  `${prefix}/${matrixCompleteBucketedDataset.id}`,
  matrixCompleteBucketedDataset,
)

const matrixInvalidMock = setupSimpleMock(`${prefix}/${matrixInvalid.id}`, matrixInvalid)

export const matrixMocks = {
  matrixCompleteDailyDatasetMock,
  matrixCompleteMonthlyDatasetMock,
  matrixCompleteAnnuallyDatasetMock,
  matrixCompleteAutoBucketedDatasetMock,
  matrixCompleteBucketedDatasetMock,
  matrixInvalidMock,
}
