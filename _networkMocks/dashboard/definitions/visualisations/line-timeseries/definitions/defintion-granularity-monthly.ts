import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as LineCharts from '../vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-monthly-dataset',
  name: 'Line-timeseries - Monthly dataset',
  description: 'This dashboard represents example line-timeseries visualisations using a monthly dataset.',
  sections: [
    {
      id: 'section-2',
      display: 'Line timeseries monthly charts',
      visualisations: [
        {
          ...LineCharts.mockMetricOneLineChartTimeseriesAllEst,
          id: 'line-timeseries-monthly-1',
        },
        {
          ...LineCharts.mockMetricTwoLineChartTimeseriesAllEst,
          id: 'line-timeseries-monthly-2',
        },
        {
          ...LineCharts.mockMetricThreeLineChartTimeseriesAllEst,
          id: 'line-timeseries-monthly-3',
        },
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
