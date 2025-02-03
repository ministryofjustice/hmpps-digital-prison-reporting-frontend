/* eslint-disable prefer-destructuring */
import { MetricsDataResponse } from '../../types/Metrics'
import ChartCardUtils from './utils'
import dashboardDefinitions from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardDefinition'
import { 
  missingEthnicityChartData,
  missingEthnicityTimeseriesChartData 
} from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardChartData'
import { DashboardDefinition } from '../../types/Dashboards'
import { mockTimeSeriesDataLastSixMonths } from '../../../../test-app/mocks/mockClients/dashboards/mockDashboardResponseData'

describe('ChartCard Utils', () => {
  let dashboardDefinition: DashboardDefinition
  let dashboardMetricsData: MetricsDataResponse[][]

  let dashboardDefinitionTimeseries: DashboardDefinition
  let dashboardMetricsDataTimeseries: MetricsDataResponse[][]

  beforeEach(() => {
    dashboardDefinition = dashboardDefinitions[0] as unknown as DashboardDefinition
    dashboardDefinitionTimeseries = dashboardDefinitions[9] as unknown as DashboardDefinition
    dashboardMetricsDataTimeseries = mockTimeSeriesDataLastSixMonths as unknown as MetricsDataResponse[][]
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
    it('should get the snapshot chart data', async () => {
      const expectedResult = missingEthnicityChartData.data
      const result = ChartCardUtils.getChartData({
        chartDefinitions: dashboardDefinition.metrics[0].charts,
        dashboardMetricsData,
      })
      expect(result).toEqual(expectedResult)
    })

    it('should get the timeseries chart data', async () => {
      const result = ChartCardUtils.getChartData({
        chartDefinitions: dashboardDefinitionTimeseries.metrics[0].charts,
        dashboardMetricsData: dashboardMetricsDataTimeseries,
        timeseries: true
      })

      expect(result).toEqual(missingEthnicityTimeseriesChartData)
    })
  })
})
