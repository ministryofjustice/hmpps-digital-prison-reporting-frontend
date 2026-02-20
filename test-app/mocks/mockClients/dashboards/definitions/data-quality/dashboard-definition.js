// @ts-nocheck
const {
  mockMetricOneBarChart,
  mockMetricOnePieChart,
  mockMetricTwoBarChart,
  mockMetricTwoPieChart,
  mockMetricThreeBarChart,
  mockMetricThreePieChart,
} = require('./visualisations')

const { lists, charts, scorecards } = require('../examples/visualisations')

const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const dataQualityDashboard1 = {
  id: 'data-quality-dashboard-1',
  name: 'Data quality dashboard',
  description: 'Testing a dashboard with timeseries chart & snapshot chart',
  sections: [
    {
      id: 'charts-section-MetricOne-breakdown',
      display: 'Totals',
      description: 'Overall data quality values',
      visualisations: [lists.dataQualityColsToList],
    },
    {
      id: 'charts-section-MetricOne-breakdown',
      display: 'Totals overtime',
      visualisations: [lists.dataQualityMetricOneHistoric],
    },
    {
      id: 'charts-section-MetricOne',
      display: 'MetricOne totals',
      description: 'Overall data quality values',
      visualisations: [mockMetricOneBarChart, mockMetricOnePieChart, lists.dataQualityMetricOne],
    },
    {
      id: 'charts-section-MetricThree',
      display: 'MetricThree totals',
      visualisations: [mockMetricThreeBarChart, mockMetricThreePieChart, lists.dataQualityMetricThree],
    },
    {
      id: 'charts-section-MetricTwo',
      display: 'MetricTwo totals',
      visualisations: [mockMetricTwoBarChart, mockMetricTwoPieChart, lists.dataQualityMetricTwo],
    },
    {
      id: 'historic',
      display: 'Data quality over time',
      visualisations: [
        charts.dataQualityMetricOneHistoricLine,
        charts.dataQualityMetricTwoHistoricLine,
        charts.dataQualityMetricThreeHistoricLine,
      ],
    },
    {
      id: 'scorecards-section',
      display: 'Scorecards',
      visualisations: [scorecards.dataQualityAllCols],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  dataQualityDashboard1,
}
