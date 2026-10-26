import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as scorecardsCompleteDataset } from './definitions/definition'
import { definition as scorecardsCompletebadDataset } from './definitions/definition-bad-data'
import { definition as scorecardsBucketsCompleteDataset } from './definitions/definition-buckets'
import { definition as scorecardsInvalidVisDefinitions } from './definitions/definition-invalid'
import { definition as scorecardsBucketsCompleteDatasetNoTs } from './definitions/definition-no-ts'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const scorecardsCompleteDatasetMock = setupSimpleMock(
  `${prefix}/${scorecardsCompleteDataset.id}`,
  scorecardsCompleteDataset,
)

const scorecardsBucketCompleteDatasetMock = setupSimpleMock(
  `${prefix}/${scorecardsBucketsCompleteDataset.id}`,
  scorecardsBucketsCompleteDataset,
)

const scorecardsCompleteDatasetNoTsMock = setupSimpleMock(
  `${prefix}/${scorecardsBucketsCompleteDatasetNoTs.id}`,
  scorecardsBucketsCompleteDatasetNoTs,
)

const scorecardsInvalidVisDefinitionsMock = setupSimpleMock(
  `${prefix}/${scorecardsInvalidVisDefinitions.id}`,
  scorecardsInvalidVisDefinitions,
)

const scorecardsCompletebadDatasetMock = setupSimpleMock(
  `${prefix}/${scorecardsCompletebadDataset.id}`,
  scorecardsCompletebadDataset,
)

export const scorecardMocks = {
  scorecardsCompleteDatasetMock,
  scorecardsBucketCompleteDatasetMock,
  scorecardsCompleteDatasetNoTsMock,
  scorecardsInvalidVisDefinitionsMock,
  scorecardsCompletebadDatasetMock,
}
