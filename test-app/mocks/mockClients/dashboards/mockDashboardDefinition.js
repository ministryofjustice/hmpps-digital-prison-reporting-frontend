const {
  mockDashboardMetricDefMissingEthnicity,
  mockDashboardMetricDefMissingEthnicityRaw,
  mockDashboardMetricDefMissingNationality,
  mockDashboardMetricDefMissingReligion,
  mockDashboardMetricDefMissingEthnicityTimeseries,
} = require('./mockDashboardMetricDefinitons')

const { metricDefDefault } = require('./mockMetricDefinitions')

const { mockListDefinitionAgeRange1, mockListDefinitionAgeRange2 } = require('./mockDashboardListDefinition')

const { establishmentIdFilter, granularDateRangeFilter } = require('./mockDashboardFilterDefinition')
const { mockDashboardDataAnalticsScoreCardGroup } = require('./mockDashboardScoreCardDefinitions')

const mockDashboardDefinition1 = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  metrics: [mockDashboardMetricDefMissingEthnicity],
}

const mockDashboardDefinition2 = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition3 = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition4 = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition5 = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition6 = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition7 = {
  id: 'test-dashboard-7',
  name: 'Test Dashboard 7',
  description: 'Will Succeed',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition8 = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard 8',
  description: 'Async Dashboard Testing',
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

const mockDashboardDefinition9 = {
  id: 'test-dashboard-9',
  name: 'Test Dashboard 9',
  description: 'Async Dashboard Testing',
  metrics: [mockDashboardMetricDefMissingEthnicityRaw],
  filterFields: [],
}

const mockDashboardDefinition10 = {
  id: 'test-dashboard-10',
  name: 'Time series test',
  description: 'Testing a dashboard with timeseries chart & snapshot chart',
  metrics: [mockDashboardMetricDefMissingEthnicityTimeseries, mockDashboardMetricDefMissingEthnicityRaw],
  scorecards: [mockDashboardDataAnalticsScoreCardGroup],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

const mockDashboardDefinition11 = {
  id: 'test-dashboard-11',
  name: 'Dashboard with Lists',
  description: 'Dashboard with Lists',
  lists: [mockListDefinitionAgeRange1, mockListDefinitionAgeRange2],
  metrics: [],
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
