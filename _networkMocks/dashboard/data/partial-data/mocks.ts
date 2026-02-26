import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { partialDataSet } from './data'
import { historicPartialData } from './data-historic'

import { visualisationIds, historicVisualisationIds } from '../../definitions/visualisations/partial-dataset'

const allIds = [...visualisationIds]
const allHistoric = [...historicVisualisationIds]
const productIds = ['dashboard-visualisations', 'request-examples', 'feature-testing']

export const dashboardResultPartialDataMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allIds.join('|')})/tables/tblId_[0-9]+/result`,
  partialDataSet,
)
export const dashboardResultPartialDataHistoricMock = setupSimpleMock(
  `/reports/(${productIds.join('|')})/dashboards/(${allHistoric.join('|')})/tables/tblId_[0-9]+/result`,
  historicPartialData,
)

export const mocks = [dashboardResultPartialDataMock, dashboardResultPartialDataHistoricMock]
