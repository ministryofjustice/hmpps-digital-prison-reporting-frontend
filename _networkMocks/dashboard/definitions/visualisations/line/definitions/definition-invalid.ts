import { DashboardVisualisationType } from '../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-visualisations_invalid',
  name: 'Line - Invalid visualisation defintions',
  description: 'This dashboard represents example invalid line visualisations.',
  sections: [
    {
      id: 'section-1',
      display: 'Line charts - invalid definitions',
      visualisations: [
        {
          id: 'mockMetricOneLineChart',
          type: DashboardVisualisationType.LINE,
          display: 'Invalid timeseries chart',
          description: 'Invalid: must have at least one measure',
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
