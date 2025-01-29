const {
  mockDashboardMetricDefMissingEthnicityTimeseries,
  missingEthnicityMetric,
  missingEthnicityMetricCharts,
  missingReligionMetric,
  missingReligionMetricCharts,
  missingNationalityMetric,
  missingNationalityMetricCharts,
  missingEthnicityMetricChartsPercentage,
  missingEthnicityMetricsChartsMixed,
} = require('./mockDashboardMetricDefinitons')

const { establishmentIdFilter, granularDateRangeFilter } = require('./mockDashboardFilterDefinition')
const { mockDashboardDataAnalticsScoreCardGroup } = require('./mockDashboardScoreCardDefinitions')

const mockDashboardDefinition1 = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  metrics: [missingEthnicityMetricsChartsMixed],
}

const mockDashboardDefinition2 = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  metrics: [missingEthnicityMetricCharts, missingNationalityMetricCharts, missingReligionMetricCharts],
}

const mockDashboardDefinition3 = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  metrics: [missingEthnicityMetricCharts, missingNationalityMetricCharts, missingReligionMetricCharts],
}

const mockDashboardDefinition4 = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  metrics: [missingEthnicityMetricCharts, missingNationalityMetricCharts, missingReligionMetricCharts],
}

const mockDashboardDefinition5 = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  metrics: [missingEthnicityMetricCharts, missingNationalityMetricCharts, missingReligionMetricCharts],
}

const mockDashboardDefinition6 = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  metrics: [missingEthnicityMetricCharts, missingNationalityMetricCharts, missingReligionMetricCharts],
}

const mockDashboardDefinition7 = {
  id: 'test-dashboard-7',
  name: 'Test Dashboard 7',
  description: 'Will Succeed',
  metrics: [missingEthnicityMetricCharts, missingNationalityMetricCharts, missingReligionMetricCharts],
}

const mockDashboardDefinition8 = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard 8',
  description: 'Async Dashboard Testing',
  metrics: [
    missingEthnicityMetricCharts,
    missingNationalityMetricCharts,
    missingReligionMetricCharts,
    missingEthnicityMetricChartsPercentage,
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

const mockDashboardDefinition9 = {
  id: 'test-dashboard-9',
  name: 'Test Dashboard 9',
  description: 'Async Dashboard Testing',
  metrics: [missingEthnicityMetricCharts],
  filterFields: [],
}

const mockDashboardDefinition10 = {
  id: 'test-dashboard-10',
  name: 'Time series test',
  description: 'Testing a dashboard with timeseries chart & snapshot chart',
  metrics: [mockDashboardMetricDefMissingEthnicityTimeseries, missingEthnicityMetric],
  scorecards: [mockDashboardDataAnalticsScoreCardGroup],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

const mockDashboardDefinition11 = {
  id: 'test-dashboard-11',
  name: 'Dashboard with Lists test',
  description: 'Testing a dashboard with lists only',
  metrics: [missingEthnicityMetric, missingReligionMetric, missingNationalityMetric],
  scorecards: [],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = [
  mockDashboardDefinition1,
  mockDashboardDefinition2,
  mockDashboardDefinition3,
  mockDashboardDefinition4,
  mockDashboardDefinition5,
  mockDashboardDefinition6,
  mockDashboardDefinition7,
  mockDashboardDefinition8,
  mockDashboardDefinition9,
  mockDashboardDefinition10,
  mockDashboardDefinition11,
]
