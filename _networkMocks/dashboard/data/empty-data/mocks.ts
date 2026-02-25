import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { undefinedDashboardData, emptyDashboardData, missingFirstRowDashboardData } from './data'
import { visualisationIds } from '../../definitions/visualisations/complete-dataset'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'

const allIds = [...visualisationIds, ...requestExampleIds, ...featureTestingIds]
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
