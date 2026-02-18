import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dietTotalsDietOneOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietOne-overtime',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'DietOne totals over time matrix chart',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}
