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

export const dataQualityMetricThreeDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricThree values',
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
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
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

export const dataQualityMetricTwoMetricThreeDoughnut: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo & MetricThree values',
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
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
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

export const dataQualityMetricThreeDoughnutTwoEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricThree values',
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
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
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

export const dataQualityMetricTwoMetricThreeDoughnutTwoEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo & MetricThree values',
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
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
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

export const dataQualityMetricThreeDoughnutAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricThree values',
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
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
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

export const dataQualityMetricTwoMetricThreeDoughnutAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricTwo-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'MetricTwo & MetricThree values',
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
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
      },
    ],
    expectNulls: false,
  },
}
