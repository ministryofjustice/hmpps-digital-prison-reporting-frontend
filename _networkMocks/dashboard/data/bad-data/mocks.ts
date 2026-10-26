import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { completeBadDataSet } from './data'
import { completeBadDataSetDuplicateKeyValues } from './data_matching-keys'

import { allVisualisationDefinitions } from '../../definitions/visualisations'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'

const allVisDefIdsArray = Object.values(allVisualisationDefinitions).map(def => def.id)

const allIds = [...allVisDefIdsArray, ...requestExampleIds, ...featureTestingIds]
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
