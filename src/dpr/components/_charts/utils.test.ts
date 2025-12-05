import { expect } from '@jest/globals'
/* eslint-disable prefer-destructuring */
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
import { components } from '../../types/api'

describe('ChartCard Utils', () => {
  let dashboardMetricsData: DashboardDataResponse[][]
  let dashboardMockDietData: DashboardDataResponse[]
  let snapshotVisualisationDefinition: components['schemas']['DashboardVisualisationDefinition']
  let snapshotVisualisationFromListDefinition: components['schemas']['DashboardVisualisationDefinition']
  let timeseriesVisualisationDefinition: components['schemas']['DashboardVisualisationDefinition']

  beforeEach(() => {
    snapshotVisualisationDefinition =
      mockEthnicityBarChart as unknown as components['schemas']['DashboardVisualisationDefinition']
    timeseriesVisualisationDefinition =
      dataQualityEthnicityHistoricLine as unknown as components['schemas']['DashboardVisualisationDefinition']
    snapshotVisualisationFromListDefinition =
      dietTotalsByEstablishmentBar as unknown as components['schemas']['DashboardVisualisationDefinition']
    dashboardMetricsData = mockTimeSeriesDataLastSixMonths
    dashboardMockDietData = mockDietDataLastSixMonths
  })

  describe('createChart', () => {
    it('should get the snapshot chart data', async () => {
      const expectedResult = barChartDataHasEthnicity
      const result = ChartCardUtils.createChart(snapshotVisualisationDefinition, dashboardMetricsData.flat(), 'bar')
      expect(result).toEqual(expectedResult)
    })

    it('should get the snapshot chart data from a list', async () => {
      const expectedResult = chartFromList
      const result = ChartCardUtils.createChart(snapshotVisualisationFromListDefinition, dashboardMockDietData, 'bar')
      expect(result).toEqual(expectedResult)
    })

    it('should create the snapshot chart data from a list', () => {
      const expectedResult = barChartFromListDataHasEthnicity
      const result = ChartCardUtils.createChart(snapshotVisualisationDefinition, dashboardMetricsData.flat(), 'bar')
      expect(result).toEqual(expectedResult)
    })

    it('should get the timeseries chart data', async () => {
      const expectedResult = dataQualityTimeseriesLine
      const result = ChartCardUtils.createTimeseriesCharts(
        timeseriesVisualisationDefinition,
        dashboardMetricsData.flat(),
        'line-timeseries',
      )
      expect(result).toEqual(expectedResult)
    })
  })
})
