import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import * as BarChart from '../../bar/vis-definitions/cols-as-labels'

export const dataQualityMetricOneLine: components['schemas']['DashboardVisualisationDefinition'] = {
  ...BarChart.dataQualityMetricOneBar,
  id: 'line-data-quality-has-MetricOne',
  type: DashboardVisualisationType.LINE,
}

export const dataQualityMetricThreeLine: components['schemas']['DashboardVisualisationDefinition'] = {
  ...BarChart.dataQualityMetricThreeBar,
  id: 'Line-data-quality-has-MetricThree',
  type: DashboardVisualisationType.LINE,
}

export const dataQualityMetricTwoLine: components['schemas']['DashboardVisualisationDefinition'] = {
  ...BarChart.dataQualityMetricTwoBar,
  id: 'line-data-quality-has-MetricTwo',
  type: DashboardVisualisationType.LINE,
}

export const dataQualityMetricOneMetricTwoLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-has-MetricOne-and-MetricTwo',
  type: DashboardVisualisationType.LINE,
  display: 'MetricOne & MetricTwo values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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

export const dataQualityAllLine: components['schemas']['DashboardVisualisationDefinition'] = {
  ...BarChart.dataQualityAllBar,
  id: 'line-data-quality-all',
  type: DashboardVisualisationType.LINE,
}
