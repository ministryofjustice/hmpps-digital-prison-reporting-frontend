import { setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { definition as listCompleteDataset } from './complete-dataset/list/definition'
import { definition as listCompleteDatasetHistoric } from './complete-dataset/list/definition-historic'
import { definition as listPartialDataset } from './partial-dataset/list/definition'
import { definition as listPartialDatasetHistoric } from './partial-dataset/list/definition-historic'
import { definition as scorecardsCompleteDataset } from './complete-dataset/scorecard/definition'
import { definition as scorecardsBucketsCompleteDataset } from './complete-dataset/scorecard/definition-buckets'
import { definition as scorecardGroupCompleteDataset } from './complete-dataset/scorecardGroup/definition'
import { definition as matrixCompleteDataset } from './complete-dataset/matrix/definition'

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

export const mocks = [
  listCompleteDatasetMock,
  listCompleteDatasetHistoricMock,
  listPartialDatasetMock,
  listPartialDatasetHistoricMock,
  scorecardsCompleteDatasetMock,
  scorecardsBucketCompleteDatasetMock,
  scorecardGroupCompleteDatasetMock,
  matrixCompleteDatasetMock,
]
