/* eslint-disable prefer-destructuring */
import { MetricsDataResponse } from '../../types/Metrics'
import ChartCardUtils from './utils'
import { mockTimeSeriesDataLastSixMonths } from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/data'
import {
  barChartDataHasEthnicity,
  barChartFromListDataHasEthnicity,
} from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/chart-data'
import { mockEthnicityBarChart } from '../../../../test-app/mocks/mockClients/dashboards/definitions/data-quality/vis-definitions'
import { DashboardVisualisation } from '../_dashboards/dashboard/types'

describe('ChartCard Utils', () => {
  let dashboardMetricsData: MetricsDataResponse[][]
  let visualisationDefinition: DashboardVisualisation

  beforeEach(() => {
    visualisationDefinition = mockEthnicityBarChart as unknown as DashboardVisualisation
    dashboardMetricsData = mockTimeSeriesDataLastSixMonths
  })

  describe('getChartData', () => {
    it('should get the snapshot chart data', async () => {
      const expectedResult = barChartDataHasEthnicity
      const result = ChartCardUtils.createChart(visualisationDefinition, dashboardMetricsData)
      expect(result).toEqual(expectedResult)
    })

    it('should create the snapshot chart data from a list', () => {
      const expectedResult = barChartFromListDataHasEthnicity
      const result = ChartCardUtils.createChart(visualisationDefinition, dashboardMetricsData)
      expect(result).toEqual(expectedResult)
    })
  })
})
