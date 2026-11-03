import { DashboardVisualisationType } from '../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'doughnut-visualisations_invalid',
  name: 'Doughnut - Invalid visualisation definitions',
  description: 'This dashboard represents example invalid doughnut visualisations.',
  sections: [
    {
      id: 'section-1',
      display: 'doughnut charts - invalid definitions',
      visualisations: [
        {
          id: 'mockInvalidDoughnutChart',
          type: DashboardVisualisationType.DONUT,
          display: 'Invalid timeseries chart',
          description: 'Invalid: must have at least two measures',
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
