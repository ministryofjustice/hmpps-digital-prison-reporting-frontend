import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { completeDataSet } from './data'
import { completeDataSetNoTs } from './data_no-ts'

import { featureTestingIds } from '../../definitions/feature-testing'
import { requestExampleIds } from '../../definitions/request-examples'
import { visIdsNoTs, visualisationIds } from '../../definitions/visualisations/complete-dataset'
import { completeDataSetAnnually } from './data_annually'
import { completeDataSetDaily } from './data_daily'

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

export const dashboardResultCompleteDataMockDaily = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/matrix-examples_complete-data_daily/tables/tblId_[0-9]+/result`,
  completeDataSetDaily,
)

export const dashboardResultCompleteDataMockMonthly = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/matrix-examples_complete-data_monthly/tables/tblId_[0-9]+/result`,
  completeDataSet,
)

export const dashboardResultCompleteDataMockAnnually = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/matrix-examples_complete-data_annually/tables/tblId_[0-9]+/result`,
  completeDataSetAnnually,
)

export const mocks = [
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataSyncMock,
  dashboardResultCompleteDataNoTsMock,
  dashboardResultCompleteDataMockDaily,
  dashboardResultCompleteDataMockMonthly,
  dashboardResultCompleteDataMockAnnually,
]
