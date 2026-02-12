import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import * as BarCharts from '../../bar/vis-definitions/definitions'

export const dietTotalsDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-diet-totals',
  type: DashboardVisualisationType.DONUT,
  display: 'Diet totals as doughnut chart',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
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

export const dietTotalsByEstablishmentDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  ...BarCharts.dietTotalsByEstablishmentBar,
  id: 'diet-totals-by-establishment-doughnut',
  type: DashboardVisualisationType.DONUT,
}

export const dietTotalsByEstablishmentByWingDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  ...BarCharts.dietTotalsByEstablishmentByWingBar,
  id: 'diet-totals-by-establishment-and-wing-doughnut',
  type: DashboardVisualisationType.DONUT,
}
