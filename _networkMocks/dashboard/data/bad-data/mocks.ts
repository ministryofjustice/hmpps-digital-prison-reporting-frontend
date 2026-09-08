import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { completeBadDataSet } from './data'
import { completeBadDataSetDuplicateKeyValues } from './data_matching-keys'

import { visualisationIds } from '../../definitions/visualisations/complete-dataset'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'

const allIds = [...visualisationIds, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultCompleteBadDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeBadDataSet,
)

export const dashboardResultCompleteBadDataSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  completeBadDataSet,
)

export const dashboardResultCompleteBadDataDuplicatesMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeBadDataSetDuplicateKeyValues,
)

export const dashboardResultCompleteBadDataDuplicatesSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  completeBadDataSetDuplicateKeyValues,
)

export const mocks = [
  dashboardResultCompleteBadDataMock,
  dashboardResultCompleteBadDataSyncMock,
  dashboardResultCompleteBadDataDuplicatesMock,
  dashboardResultCompleteBadDataDuplicatesSyncMock,
]
