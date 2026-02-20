// @ts-nocheck
const {
  mockScorecardDefinitionTotalInWing,
  mockScorecardDefinitionTotalInEst,
  mockScorecardDefinitionEthnicWhite,
  mockScorecardDefinitionEthnicAsian,
  mockScoreCardGroupMetricThree,
  mockBarChartMetricThree,
  mockPieChartMetricThree,
} = require('./visualisations')

const {
  mockListDefinitionAgeRange1,
  mockListDefinitionAgeRange2,
  mockListDefinitionMetricThree,
  mockListDefinitionMetricOne,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionCell,
  mockListDefinitionMetricTwo,
  mockListDefinitionMetricOneAgeRange,
} = require('./visualisations/list-definitions-1')

const { establishmentIdFilter, wingFilter } = require('../../filter-definitions')

const ageBreakdownReport2 = {
  id: 'age-breakdown-dashboard-2',
  name: 'Age Breakdown - Augmented',
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
      id: 'total-prisoners-by-MetricThree',
      display: 'Total Prisoners by MetricThree',
      description: 'These tables show the total prisoners by MetricThree',
      visualisations: [
        mockListDefinitionMetricThree,
        mockScoreCardGroupMetricThree,
        mockBarChartMetricThree,
        mockPieChartMetricThree,
      ],
    },
    {
      id: 'total-prisoners-by-MetricOne',
      display: 'Total Prisoners by MetricOne',
      description: 'These tables show the total prisoners by MetricOne',
      visualisations: [
        mockScorecardDefinitionEthnicWhite,
        mockScorecardDefinitionEthnicAsian,
        mockListDefinitionMetricOne,
        mockListDefinitionMetricOneAgeRange,
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
      id: 'total-prisoners-by-MetricTwo',
      display: 'Total Prisoners by MetricTwo',
      description: 'This table shows the total prisoners by MetricTwo',
      visualisations: [mockListDefinitionMetricTwo],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilter],
}

module.exports = {
  ageBreakdownReport2,
}
