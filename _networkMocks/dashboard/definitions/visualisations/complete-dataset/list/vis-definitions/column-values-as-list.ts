import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const columnValuesAsList: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-vis-def_col-values-as-rows',
  type: DashboardVisualisationType.LIST,
  display: 'Data quality values',
  description: 'Example list showing column values rows',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
      },
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
      },
    ],
    expectNulls: false,
  },
  options: { columnsAsList: true },
}
