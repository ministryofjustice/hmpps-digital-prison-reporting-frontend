import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../../../src/dpr/types/api'

export const matrixOnlyOneMeasure: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'matrixOnlyOneMeasure',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'No of prisoners with MetricTwo',
  description: 'Invalid definition - not enough measures - should only have one measure',
  columns: {
    keys: [{ id: 'ts', type: 'timestamp' }, { id: 'establishment_id' }],
    measures: [],
    expectNulls: false,
  },
}

export const matrixNoKey: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'matrixOnlyOneMeasure',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'No of prisoners with MetricThree',
  description: 'Invalid definition - No keys - should only have min one key',
  columns: {
    keys: [],
    measures: [{ id: 'has_metric_three' }],
    expectNulls: false,
  },
}
