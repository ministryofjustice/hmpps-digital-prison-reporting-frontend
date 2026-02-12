import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as listCompleteDataset } from './complete-dataset/list/definition'
import { definition as listCompleteDatasetHistoric } from './complete-dataset/list/definition-historic'
import { definition as listPartialDataset } from './partial-dataset/list/definition'
import { definition as listPartialDatasetHistoric } from './partial-dataset/list/definition-historic'
import { definition as scorecardsCompleteDataset } from './complete-dataset/scorecard/definition'
import { definition as scorecardsBucketsCompleteDataset } from './complete-dataset/scorecard/definition-buckets'
import { definition as scorecardGroupCompleteDataset } from './complete-dataset/scorecardGroup/definition'
import { definition as matrixCompleteDataset } from './complete-dataset/matrix/definition'
import { definition as barCompleteDataset } from './complete-dataset/bar/definition'
import { definition as doughnutCompleteDataset } from './complete-dataset/doughnut/definition'
import { definition as lineTimeseriesCompleteDataset } from './complete-dataset/line-timeseries/definition'
import { definition as barPartialDataset } from './partial-dataset/bar/definition'
import { definition as lineTimeseriesPartialDataset } from './partial-dataset/line-timeseries/definition'

const productId = 'dashboard-visualisations'

// LIST Definition mocks
export const listCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${listCompleteDataset.id}`,
  listCompleteDataset,
)
export const listCompleteDatasetHistoricMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${listCompleteDatasetHistoric.id}`,
  listCompleteDatasetHistoric,
)
export const listPartialDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${listPartialDataset.id}`,
  listPartialDataset,
)
export const listPartialDatasetHistoricMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${listPartialDatasetHistoric.id}`,
  listPartialDatasetHistoric,
)

// SCORECARD definition mocks
export const scorecardsCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${scorecardsCompleteDataset.id}`,
  scorecardsCompleteDataset,
)
export const scorecardsBucketCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${scorecardsBucketsCompleteDataset.id}`,
  scorecardsBucketsCompleteDataset,
)
export const scorecardGroupCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${scorecardGroupCompleteDataset.id}`,
  scorecardGroupCompleteDataset,
)

// MATRIX definition examples
export const matrixCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${matrixCompleteDataset.id}`,
  matrixCompleteDataset,
)

// BAR definition examples
export const barCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${barCompleteDataset.id}`,
  barCompleteDataset,
)
export const barPartialDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${barPartialDataset.id}`,
  barPartialDataset,
)

// DOUGHNUT definition examples
export const doughnutCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${doughnutCompleteDataset.id}`,
  doughnutCompleteDataset,
)

// LINE-TIMESERIES definition examples
export const lineTimeseriesCompleteDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${lineTimeseriesCompleteDataset.id}`,
  lineTimeseriesCompleteDataset,
)
export const lineTimeseriesPartialDatasetMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${lineTimeseriesPartialDataset.id}`,
  lineTimeseriesPartialDataset,
)

export const mocks = [
  listCompleteDatasetMock,
  listCompleteDatasetHistoricMock,
  listPartialDatasetMock,
  listPartialDatasetHistoricMock,
  scorecardsCompleteDatasetMock,
  scorecardsBucketCompleteDatasetMock,
  scorecardGroupCompleteDatasetMock,
  matrixCompleteDatasetMock,
  barCompleteDatasetMock,
  barPartialDatasetMock,
  doughnutCompleteDatasetMock,
  doughnutPartialDatasetMock,
  lineCompleteDatasetMock,
  lineTimeseriesCompleteDatasetMock,
  lineTimeseriesPartialDatasetMock,
]
