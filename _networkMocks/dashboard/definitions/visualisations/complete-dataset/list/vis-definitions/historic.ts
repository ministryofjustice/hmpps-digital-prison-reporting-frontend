import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityMetricOneHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-MetricOne-historic',
  type: DashboardVisualisationType.LIST,
  display: 'MetricOne values',
  description: 'List visualisation showing historic MetricOne values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
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
  options: { showLatest: false },
}

export const dataQualityReligionHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-religion-historic',
  type: DashboardVisualisationType.LIST,
  display: 'Religion Values',
  description: 'List visualisation showing historic religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
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
  options: { showLatest: false },
}

export const dataQualityMetricTwoHistoric: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-MetricTwo-historic',
  type: DashboardVisualisationType.LIST,
  display: 'MetricTwo values',
  description: 'List visualisation showing historic MetricTwo values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
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
  options: { showLatest: false },
}
