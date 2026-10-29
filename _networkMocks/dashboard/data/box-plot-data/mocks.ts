import { setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { boxPlotMockData } from './data'

import { allVisualisationDefinitions as vds } from '../../definitions/visualisations'

const boxPlotIds = [vds.boxPlotChartsDashboardDefinition].map(def => def.id)

export const dashboardResultBoxPlotMock = setupSimpleMock(
  `/reports/dashboard-visualisations/dashboards/(${boxPlotIds.join('|')})/tables/tblId_[0-9]+/result`,
  boxPlotMockData,
)

export const mocks = [dashboardResultBoxPlotMock]
