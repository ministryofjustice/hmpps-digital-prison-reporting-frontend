import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as scorecardsCompleteDataset } from './definitions/definition'
import { definition as scorecardsCompletebadDataset } from './definitions/definition-bad-data'
import { definition as scorecardsBucketsCompleteDataset } from './definitions/definition-buckets'
import { definition as scorecardsInvalidVisDefinitions } from './definitions/definition-invalid'
import { definition as scorecardsBucketsCompleteDatasetNoTs } from './definitions/definition-no-ts'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const scorecardsDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${scorecardsCompleteDataset.id}`,
  scorecardsCompleteDataset,
)

const scorecardsDashboardDefintionBucketMock = setupSimpleMock(
  `${prefix}/${scorecardsBucketsCompleteDataset.id}`,
  scorecardsBucketsCompleteDataset,
)

const scorecardsDashboardDefinitionNoTsMock = setupSimpleMock(
  `${prefix}/${scorecardsBucketsCompleteDatasetNoTs.id}`,
  scorecardsBucketsCompleteDatasetNoTs,
)

const scorecardsDashboardDefinitionInvalidVisDefinitionsMock = setupSimpleMock(
  `${prefix}/${scorecardsInvalidVisDefinitions.id}`,
  scorecardsInvalidVisDefinitions,
)

const scorecardsDashboardDefinitionBadDatasetMock = setupSimpleMock(
  `${prefix}/${scorecardsCompletebadDataset.id}`,
  scorecardsCompletebadDataset,
)

export const scorecardMocks = {
  scorecardsDashboardDefinitionMock,
  scorecardsDashboardDefintionBucketMock,
  scorecardsDashboardDefinitionNoTsMock,
  scorecardsDashboardDefinitionInvalidVisDefinitionsMock,
  scorecardsDashboardDefinitionBadDatasetMock,
}
