import { DashboardVisualisationType } from '../../../../src/dpr/components/_dashboards/dashboard/types'

const dietTotalsVegetarianOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Vegetarian totals over time matrix chart',
  description: '',
  showLatest: false,
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const matrix = {
  dietTotalsVegetarianOvertime,
}

export default matrix
