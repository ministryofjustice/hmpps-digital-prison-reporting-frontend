import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { undefinedDashboardData, emptyDashboardData, missingFirstRowDashboardData } from './data'
import { allVisualisationDefinitions } from '../../definitions/visualisations'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'

const allVisDefIdsArray = Object.values(allVisualisationDefinitions).map(def => def.id)

const allIds = [...allVisDefIdsArray, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultUndefinedMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  undefinedDashboardData,
)

export const dashboardResultEmptyDataSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  emptyDashboardData,
)

export const dashboardResultMissingFirstRowDataSyncMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  missingFirstRowDashboardData,
)

export const mocks = [dashboardResultEmptyDataSyncMock, dashboardResultMissingFirstRowDataSyncMock]
