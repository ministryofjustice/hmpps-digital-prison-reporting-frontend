import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityMetricOneDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricOne',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricOne values',
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

export const dataQualityReligionDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
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

export const dataQualityMetricTwoDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
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

export const dataQualityMetricTwoReligionDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo & Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
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
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityMetricOneDoughnutTwoEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricOne',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricOne values',
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
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
      {
        id: 'establishment_id',
        equals: 'GHI',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityReligionDoughnutTwoEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
      {
        id: 'establishment_id',
        equals: 'GHI',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityMetricTwoDoughnutTwoEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
      {
        id: 'establishment_id',
        equals: 'GHI',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityMetricTwoReligionDoughnutTwoEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo & Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
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
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
      {
        id: 'establishment_id',
        equals: 'GHI',
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityMetricOneDoughnutAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricOne',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricOne values',
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
    ],
    expectNulls: false,
  },
}

export const dataQualityReligionDoughnutAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
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

export const dataQualityMetricTwoDoughnutAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
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

export const dataQualityMetricTwoReligionDoughnutAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo-religion',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo & Religion values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
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
