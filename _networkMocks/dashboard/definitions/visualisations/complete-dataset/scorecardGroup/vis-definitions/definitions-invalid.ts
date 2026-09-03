import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../../../../../../src/dpr/types/api'

export const scorecardGroupInvalidDef1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-MetricOne-invalid-1',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'MetricOne score',
  description: '',
  columns: {
    keys: [
      {
        id: 'ts',
        type: 'timestamp',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_one',
        displayValue: true,
      },
    ],
    expectNulls: false,
  },
}

export const scorecardGroupInvalidDef2: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-MetricOne-invalid-2',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'MetricOne score',
  description: '',
  columns: {
    keys: [
      {
        id: 'ts',
        type: 'timestamp',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [],
    expectNulls: false,
  },
}
