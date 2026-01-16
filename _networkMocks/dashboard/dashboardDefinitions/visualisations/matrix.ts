import { DashboardVisualisationType } from '../../../../dpr/components/_dashboards/dashboard-visualisation/types'

const dietTotalsVegetarianOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Vegetarian totals over time matrix chart',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

const dataQulityHasNationalityOvertime = {
  id: 'has-nationality-overtime',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Has nationality time matrix chart for MDI',
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
        id: 'has_nationality',
        display: 'Has nationality',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'MDI',
      },
    ],
    expectNulls: false,
  },
}

const matrix = {
  dietTotalsVegetarianOvertime,
  dataQulityHasNationalityOvertime,
}

export default matrix
