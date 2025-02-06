const {
  mockDashboardMetricDefMissingEthnicity,
  mockDashboardMetricDefMissingEthnicityRaw,
  mockDashboardMetricDefMissingNationality,
  mockDashboardMetricDefMissingReligion,
  mockDashboardMetricDefMissingEthnicityTimeseries,
} = require('./mockDashboardMetricDefinitons')

const {
  mockListDefinitionAgeRange1,
  mockListDefinitionAgeRange2,
  mockListDefinitionReligion,
  mockListDefinitionEthnicity,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionCell,
  mockListDefinitionNationality,
  mockListDefinitionEthnicityAgeRange,
  mockScorecardDefinitionTotalInWing,
  mockScorecardDefinitionTotalInEst,
  mockScorecardDefinitionEthnicWhite,
  mockScorecardDefinitionEthnicAsian,
  mockScoreCardGroupReligion,
} = require('./mockDashboardAgeBreakdownVisDefinition')

const { establishmentIdFilter, granularDateRangeFilter } = require('./mockDashboardFilterDefinition')
const { mockDashboardDataAnalticsScoreCardGroup } = require('./mockDashboardScoreCardDefinitions')

const { mockDashboardNewDefinition } = require('./mockDashboardDefinitionV2')

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
  name: 'Age Breakdown Dashboard',
  description:
    'Description of the age breakdown report - This is a mocked data version of the age breakdown report, in order to test and demo dashboards with lists',
  sections: [
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [mockScorecardDefinitionTotalInWing, mockScorecardDefinitionTotalInEst],
    },
    {
      id: 'total-prisoners-by-date-range',
      display: 'Total Prisoners by date range',
      description: 'These tables show the total prisoners over different age ranges',
      visualisations: [mockListDefinitionAgeRange1, mockListDefinitionAgeRange2],
    },
    {
      id: 'total-prisoners-by-religion',
      display: 'Total Prisoners by religion',
      description: 'These tables show the total prisoners by religion',
      visualisations: [mockListDefinitionReligion, mockScoreCardGroupReligion],
    },
    {
      id: 'total-prisoners-by-ethnicity',
      display: 'Total Prisoners by ethnicity',
      description: 'These tables show the total prisoners by ethnicity',
      visualisations: [
        mockScorecardDefinitionEthnicWhite,
        mockScorecardDefinitionEthnicAsian,
        mockListDefinitionEthnicity,
        mockListDefinitionEthnicityAgeRange,
      ],
    },
    {
      id: 'total-prisoners-cell',
      display: 'Total Prisoners by cell',
      description: 'This table shows the total prisoners by cell',
      visualisations: [mockListDefinitionCell],
    },
    {
      id: 'total-prisoners-age-range-by-wing',
      display: 'Total Prisoners by age range, by wing',
      description: 'These tables shows the total prisoners by age range, by wing',
      visualisations: [mockListDefinitionAgeRange1Wing, mockListDefinitionAgeRange2Wing],
    },
    {
      id: 'total-prisoners-by-nationality',
      display: 'Total Prisoners by Nationality',
      description: 'This table shows the total prisoners by nationality',
      visualisations: [mockListDefinitionNationality],
    },
  ],
  filterFields: [],
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
  mockDashboardNewDefinition,
]
