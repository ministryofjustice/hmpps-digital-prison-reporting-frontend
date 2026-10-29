import { DashboardVisualisationType } from '../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations_invalid',
  name: 'Line-timeseries - Invalid visualisation definitions',
  description: 'This dashboard represents example invalid line-timeseries visualisations.',
  sections: [
    {
      id: 'section-1',
      display: 'Line timeseries charts - invalid definitions',
      visualisations: [
        {
          id: 'mockMetricOneLineChartTimeseries',
          type: DashboardVisualisationType.LINE_TIMESERIES,
          display: 'Invalid timeseries chart',
          description: 'Invalid: no timestamp measure + at least one measure',
          columns: {
            keys: [{ id: 'ts' }],
            measures: [],
            expectNulls: false,
          },
        },
      ],
    },
  ],
  filterFields: [],
}
