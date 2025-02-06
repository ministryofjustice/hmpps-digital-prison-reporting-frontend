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
  mockBarChartReligion,
  mockPieChartReligion,
} = require('./vis-definitions')

const ageBreakdownReport1 = {
  id: 'age-breakdown-dashboard-1',
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
      visualisations: [
        mockListDefinitionReligion,
        mockScoreCardGroupReligion,
        mockBarChartReligion,
        mockPieChartReligion,
      ],
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

module.exports = {
  ageBreakdownReport1,
}
