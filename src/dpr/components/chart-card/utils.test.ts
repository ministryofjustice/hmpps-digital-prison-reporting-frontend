/* eslint-disable prefer-destructuring */
import { MetricsDataResponse } from '../../types/Metrics'
import ChartCardUtils from './utils'
import dashboardDefinitions from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardDefinition'
import { missingEthnicityChartData } from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardChartData'
import { DashboardDefinition } from '../../types/Dashboards'

describe('ChartCard Utils', () => {
  let dashboardDefinition: DashboardDefinition
  let dashboardMetricsData: MetricsDataResponse[]

  beforeEach(() => {
    dashboardDefinition = dashboardDefinitions[0] as unknown as DashboardDefinition
    dashboardMetricsData = [
      {
        establishment_id: 'KMI',
        has_ethnicity_percentage: 25.09,
        has_no_ethnicity_percentage: 75.91,
        has_ethnicity: 300,
        has_no_ethnicity: 100,
        random_data: 20,
      },
      {
        establishment_id: 'LEI',
        has_ethnicity_percentage: 47.09,
        has_no_ethnicity_percentage: 52.91,
        has_ethnicity: 100,
        has_no_ethnicity: 50,
        random_data: 50,
      },
    ]
  })

  describe('getChartData', () => {
    it('should get the chart data', async () => {
      const expectedResult = [missingEthnicityChartData]
      const result = ChartCardUtils.getChartData({
        dashboardDefinition,
        dashboardMetricsData,
      })
      expect(result).toEqual(expectedResult)
    })
  })
})
