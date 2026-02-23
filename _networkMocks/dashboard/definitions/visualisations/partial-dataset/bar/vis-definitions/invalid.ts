import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

// MISSING Y AXIS
export const invalidAxisXBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-bar',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

// MISSING X AXIS
export const invalidAxisYBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-bar',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}
