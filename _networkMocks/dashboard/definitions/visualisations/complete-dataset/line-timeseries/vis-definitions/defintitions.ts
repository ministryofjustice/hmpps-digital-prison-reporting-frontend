import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const mockMetricOneLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricOneLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing MetricOne timeseries chart',
  description: 'Prisoner totals for missing MetricOne by establishment over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'metric_one_is_missing',
        display: 'Has no MetricOne',
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

export const mockMetricTwoLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricTwoLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing MetricTwo timeseries chart',
  description: 'Prisoner totals for missing MetricTwo by establishment over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'metric_two_is_missing',
        display: 'Has no MetricTwo',
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

export const mockMetricThreeLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricThreeLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing MetricThree timeseries chart',
  description: 'Prisoner totals for missing MetricThree by establishment over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'metric_three_is_missing',
        display: 'Has no MetricThree',
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

export const mockMetricOneLineChartTimeseriesAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricOneLineChartTimeseriesAllEst',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing MetricOne timeseries chart',
  description: 'Prisoner totals for missing MetricOne for multiple establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'metric_one_is_missing',
        display: 'Has no MetricOne',
      },
    ],
    expectNulls: false,
  },
}

export const mockMetricTwoLineChartTimeseriesAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricTwoLineChartTimeseriesAllEst',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing MetricTwo timeseries chart',
  description: 'Prisoner totals for missing MetricTwo for all establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'metric_two_is_missing',
        display: 'Has no MetricTwo',
      },
    ],
    expectNulls: false,
  },
}

export const mockMetricThreeLineChartTimeseriesAllEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricThreeLineChartTimeseriesAllEst',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing MetricThree timeseries chart',
  description: 'Prisoner totals for missing MetricThree for all establishments over time',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'metric_three_is_missing',
        display: 'Has no MetricThree',
      },
    ],
    expectNulls: false,
  },
}
