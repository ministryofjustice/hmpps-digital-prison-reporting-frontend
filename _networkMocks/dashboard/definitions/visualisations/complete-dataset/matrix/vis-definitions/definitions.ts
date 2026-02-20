import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../../../src/dpr/types/api'

export const dataQualityHasMetricTwoOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'has-MetricTwo-overtime',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Has MetricTwo time matrix chart for establishment ABC',
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
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}
