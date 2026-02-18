// @ts-nocheck
const {
  mockListDefinitionAgeRange1,
  mockListDefinitionAgeRange2,
  mockListDefinitionReligion,
  mockListDefinitionMetricOne,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionCell,
  mockListDefinitionMetricTwo,
  mockListDefinitionMetricOneAgeRange,
  mockListDefinitionTotalPrisonersByWing,
  mockListDefinitionTotalPrisoners,
} = require('./visualisations/list-definitions-1')

const { establishmentIdFilter, wingFilter } = require('../../filter-definitions')

const ageBreakdownReport1 = {
  id: 'age-breakdown-dashboard-1',
  name: 'Age Breakdown - Mocked',
  description:
    'This is a mocked data version of the age breakdown report, in order to test and demo dashboards with lists',
  sections: [
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [mockListDefinitionTotalPrisonersByWing, mockListDefinitionTotalPrisoners],
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
      visualisations: [mockListDefinitionReligion],
    },
    {
      id: 'total-prisoners-by-MetricOne',
      display: 'Total Prisoners by MetricOne',
      description: 'These tables show the total prisoners by MetricOne',
      visualisations: [mockListDefinitionMetricOne, mockListDefinitionMetricOneAgeRange],
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
    {
      id: 'the-full-dataset',
      display: 'The full dataset',
      visualisations: [
        {
          id: 'allData',
          type: 'list',
          columns: {},
        },
      ],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilter],
}

module.exports = {
  ageBreakdownReport1,
}
