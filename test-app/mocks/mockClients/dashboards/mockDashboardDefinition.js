const {
  mockDashboardMetricDefMissingEthnicity,
  mockDashboardMetricDefMissingNationality,
  mockDashboardMetricDefMissingReligion,
} = require('./mockDashboardMetricDefinitons')

const mockDashboardDefinition1 = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
}

const mockDashboardDefinition2 = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
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
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
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
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
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
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
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
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
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
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
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
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
  metrics: [
    mockDashboardMetricDefMissingEthnicity,
    mockDashboardMetricDefMissingNationality,
    mockDashboardMetricDefMissingReligion,
  ],
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
]
