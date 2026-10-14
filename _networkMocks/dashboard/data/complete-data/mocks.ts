import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { completeDataSet } from './data'
import { completeDataSetNoTs } from './data_no-ts'

import { featureTestingIds } from '../../definitions/feature-testing'
import { requestExampleIds } from '../../definitions/request-examples'
import { visIdsNoTs, visualisationIds } from '../../definitions/visualisations/complete-dataset'
import { completeDataSetAnnually } from './data_annually'
import { completeDataSetDaily } from './data_daily'
import { completeDataSetMonthly } from './date_monthly'

const allIds = [...visualisationIds, ...requestExampleIds, ...featureTestingIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

const dailyDefIds = ['matrix-examples_complete-data_daily', 'line-timeseries-visualisations-daily-complete-dataset']
export const dashboardResultCompleteDataMockDaily = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/matrix-examples_complete-data_daily (${dailyDefIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetDaily,
)

const monthlyDefIds = [
  'matrix-examples_complete-data_monthly',
  'line-timeseries-visualisations-monthly-complete-dataset',
]
export const dashboardResultCompleteDataMockMonthly = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${monthlyDefIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetMonthly,
)

const annuallyDefIds = [
  'matrix-examples_complete-data_annually',
  'line-timeseries-visualisations-yearly-complete-dataset',
]
export const dashboardResultCompleteDataMockAnnually = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${annuallyDefIds.join('|')})/tables/tblId_[0-9]+/result`,
  completeDataSetAnnually,
)

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
  dashboardResultCompleteDataMockDaily,
  dashboardResultCompleteDataMockMonthly,
  dashboardResultCompleteDataMockAnnually,
  dashboardResultCompleteDataMock,
  dashboardResultCompleteDataSyncMock,
  dashboardResultCompleteDataNoTsMock,
]
