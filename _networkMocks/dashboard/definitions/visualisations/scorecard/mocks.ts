import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as scorecardsDashboardDefinition } from './definitions/definition'
import { definition as scorecardsDashboardDefinitionBadDataset } from './definitions/definition-bad-data'
import { definition as scorecardsDashboardDefinitionBuckets } from './definitions/definition-buckets'
import { definition as scorecardsDashboardDefinitionInvalidVisDefinitions } from './definitions/definition-invalid'
import { definition as scorecardsDashboardDefinitionBucketsDatasetNoTs } from './definitions/definition-no-ts'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const scorecardsDashboardDefinitionMock = setupSimpleMock(
  `${prefix}/${scorecardsDashboardDefinition.id}`,
  scorecardsDashboardDefinition,
)

const scorecardsDashboardDefintionBucketMock = setupSimpleMock(
  `${prefix}/${scorecardsDashboardDefinitionBuckets.id}`,
  scorecardsDashboardDefinitionBuckets,
)

const scorecardsDashboardDefinitionNoTsMock = setupSimpleMock(
  `${prefix}/${scorecardsDashboardDefinitionBucketsDatasetNoTs.id}`,
  scorecardsDashboardDefinitionBucketsDatasetNoTs,
)

const scorecardsDashboardDefinitionInvalidVisDefinitionsMock = setupSimpleMock(
  `${prefix}/${scorecardsDashboardDefinitionInvalidVisDefinitions.id}`,
  scorecardsDashboardDefinitionInvalidVisDefinitions,
)

const scorecardsDashboardDefinitionBadDatasetMock = setupSimpleMock(
  `${prefix}/${scorecardsDashboardDefinitionBadDataset.id}`,
  scorecardsDashboardDefinitionBadDataset,
)

export const scorecardMocks = {
  scorecardsDashboardDefinitionMock,
  scorecardsDashboardDefintionBucketMock,
  scorecardsDashboardDefinitionNoTsMock,
  scorecardsDashboardDefinitionInvalidVisDefinitionsMock,
  scorecardsDashboardDefinitionBadDatasetMock,
}
