import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import { definition as monthlyDefinition } from './defintion-granularity-monthly'
import { definition as annuallyDefinition } from './definition-granularity-yearly'
import * as LineCharts from './vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-daily-complete-dataset',
  name: 'Line-timeseries - Daily Complete dataset',
  description:
    'This dashboard represents example line-timeseries visualisations using a daily complete dataset. The dashboard aims to demonstrate how charts will adapt to daily data',
  sections: [
    {
      id: 'section-1',
      display: 'Line timeseries daily charts',
      visualisations: [
        LineCharts.mockMetricOneLineChartTimeseriesAllEst,
        LineCharts.mockMetricTwoLineChartTimeseriesAllEst,
        LineCharts.mockMetricThreeLineChartTimeseriesAllEst,
      ],
    },
    {
      id: 'totals-breakdown-daily',
      display: 'Daily Dataset',
      visualisations: [fullDataset],
    },
  ],
  childVariants: [monthlyDefinition, annuallyDefinition],
  filterFields: [],
}
