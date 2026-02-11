import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityHasNationalityOvertime = {
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
