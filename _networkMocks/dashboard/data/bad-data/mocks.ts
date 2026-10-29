import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { badDataSet } from './data'
import { badDataSetDuplicateKeyValues } from './data_matching-keys'

import { allVisualisationDefinitions } from '../../definitions/visualisations'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'

const allVisDefIdsArray = Object.values(allVisualisationDefinitions).map(def => def.id)

const allIds = [...allVisDefIdsArray, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultBadDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  badDataSet,
  2,
)

export const dashboardResultBadDataSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  badDataSet,
  2,
)

export const dashboardResultBadDataDuplicatesMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  badDataSetDuplicateKeyValues,
  2,
)

export const dashboardResultBadDataDuplicatesSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  badDataSetDuplicateKeyValues,
  2,
)

export const mocks = [
  dashboardResultBadDataMock,
  dashboardResultBadDataSyncMock,
  dashboardResultBadDataDuplicatesMock,
  dashboardResultBadDataDuplicatesSyncMock,
]
