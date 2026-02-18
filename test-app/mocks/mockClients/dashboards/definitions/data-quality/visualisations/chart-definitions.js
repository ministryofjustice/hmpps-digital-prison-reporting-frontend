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

const mockMetricOnePieChart = {
  ...mockMetricOneBarChart,
  id: 'mockMetricOnePieChart',
  type: 'doughnut',
  display: 'Missing MetricOne Pie Chart',
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

const mockReligionPieChart = {
  ...mockMetricTwoBarChart,
  id: 'mockReligionPieChart',
  type: 'doughnut',
  display: 'Missing MetricTwo Pie Chart',
}

const mockReligionBarChart = {
  id: 'mockReligionBarChart',
  type: 'bar',
  display: 'Missing Religion Bar Chart',
  description: 'Prisoner totals for missing religion',
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
        display: 'Has no religion',
      },
    ],
  },
}

const mockMetricTwoPieChart = {
  ...mockMetricTwoBarChart,
  id: 'mockMetricTwoPieChart',
  type: 'doughnut',
  display: 'Missing Religion Pie Chart',
}

module.exports = {
  mockMetricOneBarChart,
  mockMetricOnePieChart,
  mockMetricTwoBarChart,
  mockMetricTwoPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
  mockMetricOneBarChartList,
  mockMetricOneLineChartTimeseries,
}
