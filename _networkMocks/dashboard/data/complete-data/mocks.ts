import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { completeDataSet } from './data'
import { completeDataSetNoTs } from './data_no-ts'

import { visualisationIds, visIdsNoTs } from '../../definitions/visualisations/complete-dataset'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'

const allIds = [...visualisationIds, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultCompleteDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSet,
)

export const dashboardResultCompleteDataSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  completeDataSet,
)

export const dashboardResultCompleteDataNoTsMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${visIdsNoTs.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetNoTs,
)

export const mocks = [
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataSyncMock,
  dashboardResultCompleteDataNoTsMock,
]
