// @ts-nocheck
const mockMetricOneBarChart = {
  id: 'mockMetricOneBarChart',
  type: 'bar',
  display: 'Missing MetricOne Bar Chart',
  description: 'Prisoner totals for missing MetricOne',
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
        display: 'Has no MetricOne',
      },
    ],
  },
}

const mockMetricOneBarChartList = {
  id: 'mockMetricOneBarChartFromList',
  type: 'bar',
  display: 'Missing MetricOne Bar Chart from list',
  description: 'Prisoner totals for missing MetricOne by establishment',
  columns: {
    keys: [],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        axis: 'x',
      },
      {
        id: 'metric_one_is_missing',
        display: 'Has no MetricOne',
        axis: 'y',
      },
    ],
  },
}

const mockMetricOneLineChartTimeseries = {
  id: 'mockMetricOneLineChartTimeseries',
  type: 'line-timeseries',
  display: 'Missing MetricOne timeseries chart',
  description: 'Prisoner totals for missing MetricOne by establishment',
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
  },
}

const mockMetricOneDoughnutChart = {
  ...mockMetricOneBarChart,
  id: 'mockMetricOneDoughnutChart',
  type: 'doughnut',
  display: 'Missing MetricOne Doughnut Chart',
}

const mockMetricTwoBarChart = {
  id: 'mockMetricTwoBarChart',
  type: 'bar',
  display: 'Missing MetricTwo Bar Chart',
  description: 'Prisoner totals for missing MetricTwo',
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
        display: 'Has no MetricTwo',
      },
    ],
  },
}

const mockMetricThreeDoughnutChart = {
  ...mockMetricTwoBarChart,
  id: 'mockMetricThreeDoughnutChart',
  type: 'doughnut',
  display: 'Missing MetricTwo Doughnut Chart',
}

const mockMetricThreeBarChart = {
  id: 'mockMetricThreeBarChart',
  type: 'bar',
  display: 'Missing MetricThree Bar Chart',
  description: 'Prisoner totals for missing MetricThree',
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
        display: 'Has no MetricThree',
      },
    ],
  },
}

const mockMetricTwoDoughnutChart = {
  ...mockMetricTwoBarChart,
  id: 'mockMetricTwoDoughnutChart',
  type: 'doughnut',
  display: 'Missing MetricThree Doughnut Chart',
}

module.exports = {
  mockMetricOneBarChart,
  mockMetricOneDoughnutChart,
  mockMetricTwoBarChart,
  mockMetricTwoDoughnutChart,
  mockMetricThreeBarChart,
  mockMetricThreeDoughnutChart,
  mockMetricOneBarChartList,
  mockMetricOneLineChartTimeseries,
}
