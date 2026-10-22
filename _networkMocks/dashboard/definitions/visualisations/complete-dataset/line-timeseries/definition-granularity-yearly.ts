import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import * as LineCharts from './vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-yearly-complete-dataset',
  name: 'Line-timeseries - Yearly Complete dataset',
  description: 'This dashboard represents example line-timeseries visualisations using a yearly complete dataset.',
  sections: [
    {
      id: 'section-3',
      display: 'Line timeseries yearly charts',
      visualisations: [
        LineCharts.mockMetricOneLineChartTimeseriesAllEst,
        LineCharts.mockMetricTwoLineChartTimeseriesAllEst,
        LineCharts.mockMetricThreeLineChartTimeseriesAllEst,
      ],
    },
    {
      id: 'totals-breakdown-yearly',
      display: 'Yearly Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
