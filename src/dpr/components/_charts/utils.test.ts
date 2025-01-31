/* eslint-disable prefer-destructuring */
import { MetricsDataResponse } from '../../../types/Metrics'
import ChartCardUtils from './utils'
import dashboardDefinitions from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardDefinition'
import { missingEthnicityChartData } from '../../../../../test-app/mocks/mockClients/dashboards/mockDashboardChartData'
import { DashboardDefinition } from '../../../types/Dashboards'

describe('ChartCard Utils', () => {
  let dashboardDefinition: DashboardDefinition
  let dashboardMetricsData: MetricsDataResponse[]

  beforeEach(() => {
    dashboardDefinition = dashboardDefinitions[0] as unknown as DashboardDefinition
    dashboardMetricsData = [
      [
        {
          establishment_id: { raw: 'KMI' },
          has_ethnicity_percentage: { raw: 25.09 },
          ethnicity_is_missing_percentage: { raw: 74.91 },
          has_ethnicity: { raw: 300 },
          ethnicity_is_missing: { raw: 100 },
          random_data: { raw: 20 },
        },
        {
          establishment_id: { raw: 'LEI' },
          has_ethnicity_percentage: { raw: 47.09 },
          ethnicity_is_missing_percentage: { raw: 52.91 },
          has_ethnicity: { raw: 100 },
          ethnicity_is_missing: { raw: 50 },
          random_data: { raw: 50 },
        },
      ],
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
