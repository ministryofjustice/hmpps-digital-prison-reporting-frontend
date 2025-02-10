const {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
  mockScorecardDefinitionNationality,
  mockScorecardDefinitionNoNationality,
  mockScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
  mockScorecardGroupNationalityByEstablishment,
  mockScorecardGroupEthnicityByEstablishment,
  mockTargetScorecardDefinitionReligion,
  mockEthnicityBarChartList,
  mockEthnicityLineChartTimeseries,
} = require('./definitions/data-quality/vis-definitions')

const { establishmentIdFilter, granularDateRangeFilter } = require('./filter-definitions')

const { mockDashboardNewDefinition } = require('./mockDashboardDefinitionV2')
const { ageBreakdownReport1 } = require('./definitions/age-breakdown/dashboard-definition')
const { dataQualityDashboard1 } = require('./definitions/data-quality/dashboard-definition')
const { mockDataDashboard1 } = require('./definitions/prison-totals/dashboard-definition')

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
  name: 'Test Dashboard',
  description: 'Dashboard used for testing testing',
  sections: [
    {
      id: 'test-section-1',
      display: 'Missing ethnicity Charts',
      visualisations: [mockEthnicityBarChart, mockEthnicityPieChart, mockEthnicityBarChartList],
    },
    {
      id: 'test-section-2',
      display: 'Missing nationality Charts',
      visualisations: [mockNationalityBarChart, mockNationalityPieChart],
    },
    {
      id: 'test-section-3',
      display: 'Missing religion Charts',
      visualisations: [mockReligionBarChart, mockReligionPieChart],
    },
    {
      id: 'test-section-4',
      display: 'Individual Scorecards',
      description: 'Testing individually defined scorecards',
      visualisations: [
        mockScorecardDefinitionNationality,
        mockScorecardDefinitionNoNationality,
        mockScorecardDefinitionReligion,
      ],
    },
    {
      id: 'test-section-5',
      display: 'Individual Scorecards targeting values',
      description: 'Testing individually defined scorecards that target specfic column value',
      visualisations: [mockTargetScorecardDefinitionReligion],
    },
    {
      id: 'test-section-6',
      display: 'Scorecard Group',
      description: 'Testing scorecard groups created from list data',
      visualisations: [
        mockScorecardGroupReligionByEstablishment,
        mockScorecardGroupNationalityByEstablishment,
        mockScorecardGroupEthnicityByEstablishment,
      ],
    },
    {
      id: 'test-section-7',
      display: 'Timeseries charts',
      description: 'Testing timeseries charts',
      visualisations: [mockEthnicityLineChartTimeseries],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

// mockEthnicityLineChartTimeseries

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
  mockDataDashboard1,
]
