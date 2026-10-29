import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as LineCharts from '../vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations',
  name: 'Line-timeseries charts dashboard',
  description:
    'This dashboard represents example line-timeseries visualisations using the default dataset. The dashboard aims to show all the options available to display a line-timeseries using the default dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Line timeseries charts - single line',
      visualisations: [
        LineCharts.mockMetricOneLineChartTimeseries,
        LineCharts.mockMetricTwoLineChartTimeseries,
        LineCharts.mockMetricThreeLineChartTimeseries,
      ],
    },
    {
      id: 'section-2',
      display: 'Line timeseries charts - multiple line',
      visualisations: [
        LineCharts.mockMetricOneLineChartTimeseriesAllEst,
        LineCharts.mockMetricTwoLineChartTimeseriesAllEst,
        LineCharts.mockMetricThreeLineChartTimeseriesAllEst,
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
