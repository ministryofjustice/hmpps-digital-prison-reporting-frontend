const {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
} = require('./definitions/data-quality/vis-definitions')

const { establishmentIdFilter, granularDateRangeFilter } = require('./filter-definitions')

const { mockDashboardNewDefinition } = require('./mockDashboardDefinitionV2')
const { ageBreakdownReport1 } = require('./definitions/age-breakdown/dashboard-definition')
const { dataQualityDashboard1 } = require('./definitions/data-quality/dashboard-definition')

const successfulExecution = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  sections: [],
  filterFields: [],
}

const failedExecution = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  sections: [],
  filterFields: [],
}

const serverError = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  sections: [],
  filterFields: [],
}

const expiredDashboard = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  sections: [],
  filterFields: [],
}

const requestTimeout = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  sections: [],
  filterFields: [],
}

const failedRequest = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  sections: [],
  filterFields: [],
}

const unitTesting = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard 8',
  description: 'Async Dashboard Testing',
  sections: [
    {
      id: 'test-section',
      display: 'Charts Test Section',
      visualisations: [
        mockEthnicityBarChart,
        mockEthnicityPieChart,
        mockNationalityBarChart,
        mockNationalityPieChart,
        mockReligionBarChart,
        mockReligionPieChart,
      ],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = [
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
  unitTesting,
  dataQualityDashboard1,
  ageBreakdownReport1,
  mockDashboardNewDefinition,
]
