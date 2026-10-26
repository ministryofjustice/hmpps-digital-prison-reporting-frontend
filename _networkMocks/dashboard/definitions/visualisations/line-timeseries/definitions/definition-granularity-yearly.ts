import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as LineCharts from '../vis-definitions/defintitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-yearly-complete-dataset',
  name: 'Line-timeseries - Yearly Complete dataset',
  description: 'This dashboard represents example line-timeseries visualisations using a yearly complete dataset.',
  sections: [
    {
      id: 'section-3',
      display: 'Line timeseries yearly charts',
      visualisations: [
        {
          ...LineCharts.mockMetricOneLineChartTimeseriesAllEst,
          id: 'line-timeseries-yearly-1',
        },
        {
          ...LineCharts.mockMetricTwoLineChartTimeseriesAllEst,
          id: 'line-timeseries-yearly-2',
        },
        {
          ...LineCharts.mockMetricThreeLineChartTimeseriesAllEst,
          id: 'line-timeseries-yearly-3',
        },
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
