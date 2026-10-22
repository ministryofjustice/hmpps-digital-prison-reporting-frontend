import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import * as LineCharts from './vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-monthly-complete-dataset',
  name: 'Line-timeseries - Monthly Complete dataset',
  description: 'This dashboard represents example line-timeseries visualisations using a monthly complete dataset.',
  sections: [
    {
      id: 'section-2',
      display: 'Line timeseries monthly charts',
      visualisations: [
        LineCharts.mockMetricOneLineChartTimeseriesAllEst,
        LineCharts.mockMetricTwoLineChartTimeseriesAllEst,
        LineCharts.mockMetricThreeLineChartTimeseriesAllEst,
      ],
    },
    {
      id: 'totals-breakdown-monthly',
      display: 'Monthly Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
