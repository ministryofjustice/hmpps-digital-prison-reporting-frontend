import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as LineCharts from '../vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisation-bad-data',
  name: 'Line-timeseries charts dashboard - Bad Data',
  description: 'This dashboard represents example line-timeseries visualisations using the bad dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Line timeseries charts - single line',
      visualisations: [
        LineCharts.mockHasMetricOneLineChartTimeseries,
        LineCharts.mockHasMetricTwoLineChartTimeseries,
        LineCharts.mockHasMetricThreeLineChartTimeseries,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
