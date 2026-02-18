import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityMetricOne: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-MetricOne',
  type: DashboardVisualisationType.LIST,
  display: 'MetricOne values',
  description: 'List visualisation showing MetricOne values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-religion',
  type: DashboardVisualisationType.LIST,
  display: 'Religion values',
  description: 'List visualisation showing religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityMetricTwo: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-MetricTwo',
  type: DashboardVisualisationType.LIST,
  display: 'MetricTwo values',
  description: 'List visualisation showing MetricTwo values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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
}
