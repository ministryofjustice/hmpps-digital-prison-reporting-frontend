import { DashboardDataResponse } from '../../types/Metrics'
import ChartCardUtils from './utils'
import { mockTimeSeriesDataLastSixMonths } from '../../../../test-app/mocks/mockClients/dashboards/data/data-quality-metrics/data'
import { mockDietDataLastSixMonths } from '../../../../test-app/mocks/mockClients/dashboards/data/test-data/data'
import {
  barChartDataHasEthnicity,
  barChartFromListDataHasEthnicity,
  dataQualityTimeseriesLine,
  chartFromList,
} from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/chart-data'
import { mockEthnicityBarChart } from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/visualisations'
import {
  dataQualityEthnicityHistoricLine,
  dietTotalsByEstablishmentBar,
} from '../../../../test-app/mocks/mockClients/dashboards/definitions/examples/visualisations/charts'
import { DashboardVisualisation } from '../_dashboards/dashboard/types'

describe('ChartCard Utils', () => {
  let dashboardMetricsData: DashboardDataResponse[][]
  let dashboardMockDietData: DashboardDataResponse[]
  let snapshotVisualisationDefinition: DashboardVisualisation
  let snapshotVisualisationFromListDefinition: DashboardVisualisation
  let timeseriesVisualisationDefinition: DashboardVisualisation

  beforeEach(() => {
    snapshotVisualisationDefinition = mockEthnicityBarChart as unknown as DashboardVisualisation
    timeseriesVisualisationDefinition = dataQualityEthnicityHistoricLine as unknown as DashboardVisualisation
    snapshotVisualisationFromListDefinition = dietTotalsByEstablishmentBar as unknown as DashboardVisualisation
    dashboardMetricsData = mockTimeSeriesDataLastSixMonths
    dashboardMockDietData = mockDietDataLastSixMonths
  })

  describe('createChart', () => {
    it('should get the snapshot chart data', async () => {
      const expectedResult = barChartDataHasEthnicity
      const result = ChartCardUtils.createChart(snapshotVisualisationDefinition, dashboardMetricsData.flat())
      expect(result).toEqual(expectedResult)
    })

    it('should get the snapshot chart data from a list', async () => {
      const expectedResult = chartFromList
      const result = ChartCardUtils.createChart(snapshotVisualisationFromListDefinition, dashboardMockDietData)
      expect(result).toEqual(expectedResult)
    })

    it('should create the snapshot chart data from a list', () => {
      const expectedResult = barChartFromListDataHasEthnicity
      const result = ChartCardUtils.createChart(snapshotVisualisationDefinition, dashboardMetricsData.flat())
      expect(result).toEqual(expectedResult)
    })

    it('should get the timeseries chart data', async () => {
      const expectedResult = dataQualityTimeseriesLine
      const result = ChartCardUtils.createChart(timeseriesVisualisationDefinition, dashboardMetricsData.flat())
      expect(result).toEqual(expectedResult)
    })
  })
})
