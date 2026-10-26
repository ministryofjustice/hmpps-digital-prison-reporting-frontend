import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { definition as scorecardGroupCompleteDataset } from './definitions/definition'
import { definition as scorecardGroupCompleteDatasetInvalid } from './definitions/definition-invalid'
import { definition as scorecardGroupCompleteDatasetNoTs } from './definitions/definiton-no-ts'

const prefix = '/definitions/dashboard-visualisations/dashboards'

const scorecardGroupCompleteDatasetMock = setupSimpleMock(
  `${prefix}/${scorecardGroupCompleteDataset.id}`,
  scorecardGroupCompleteDataset,
)

const scorecardGroupCompleteDatasetInvalidMock = setupSimpleMock(
  `${prefix}/${scorecardGroupCompleteDatasetInvalid.id}`,
  scorecardGroupCompleteDatasetInvalid,
)

const scorecardGroupCompleteDatasetNoTsMock = setupSimpleMock(
  `${prefix}/${scorecardGroupCompleteDatasetNoTs.id}`,
  scorecardGroupCompleteDatasetNoTs,
)

export const scorecardGroupMocks = {
  scorecardGroupCompleteDatasetMock,
  scorecardGroupCompleteDatasetInvalidMock,
  scorecardGroupCompleteDatasetNoTsMock,
}
