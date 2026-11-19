import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { badDataSet } from './data'
import { badDataSetDuplicateKeyValues } from './data_matching-keys'
import { badDataSetHistoric } from './data-historic'

import { allVisualisationDefinitions } from '../../definitions/visualisations'
import { requestExampleIds } from '../../definitions/request-examples'
import { featureTestingIds } from '../../definitions/feature-testing'
import { incorrectDailyFormatDataSet } from './data-incorrect-daily-format'
import { incorrectMontlyFormatDataSet } from './data-incorrect-monthly-format'
import { incorrectYearlyFormatDataSet } from './data-incorrect-yearly-format'

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

export const dashboardResultBadDataHistoricMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  badDataSetHistoric,
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

export const dashboardResultIncorrectDailyFormatDataSetMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  incorrectDailyFormatDataSet,
  2,
)

export const dashboardResultIncorrectMonthlyFormatDataSetMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  incorrectMontlyFormatDataSet,
  2,
)

export const dashboardResultIncorrectYearlyFormatDataSetMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})`,
  incorrectYearlyFormatDataSet,
  2,
)

export const mocks = [
  dashboardResultBadDataMock,
  dashboardResultBadDataSyncMock,
  dashboardResultBadDataHistoricMock,
  dashboardResultBadDataDuplicatesMock,
  dashboardResultBadDataDuplicatesSyncMock,
  dashboardResultIncorrectDailyFormatDataSetMock,
  dashboardResultIncorrectMonthlyFormatDataSetMock,
  dashboardResultIncorrectYearlyFormatDataSetMock,
]
