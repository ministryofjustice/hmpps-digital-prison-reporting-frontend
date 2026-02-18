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
  mockListDefinitionMetricOneByEst,
  mockListDefinitionReligionByEst,
  mockListDefinitionMetricTwoByWing,
} = require('./visualisations')

const { establishmentIdFilter, wingFilter } = require('../../filter-definitions')

const ageBreakdownReport3 = {
  id: 'age-breakdown-dashboard-3',
  name: 'Age Breakdown - Mocked data generator',
  description:
    'Description of the age breakdown report - This is a mocked data version of the age breakdown report, in order to test and demo dashboards with lists',
  sections: [
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [mockListDefinitionTotalPrisonersByWing, mockListDefinitionTotalPrisoners],
    },
    {
      id: 'total-prisoners-by-date-range',
      display: 'Total Prisoners by age range',
      description: 'These tables show the total prisoners over different age ranges',
      visualisations: [mockListDefinitionAgeRange1, mockListDefinitionAgeRange2],
    },
    {
      id: 'total-prisoners-by-religion',
      display: 'Total Prisoners by religion',
      description: 'These tables show the total prisoners by religion',
      visualisations: [mockListDefinitionReligionByEst, mockListDefinitionReligion],
    },
    {
      id: 'total-prisoners-by-MetricOne',
      display: 'Total Prisoners by MetricOne',
      description: 'These tables show the total prisoners by MetricOne',
      visualisations: [
        mockListDefinitionMetricOneByEst,
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
      visualisations: [mockListDefinitionMetricTwo, mockListDefinitionMetricTwoByWing],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [
        {
          id: 'allData',
          type: 'list',
          display: 'All Data in dataset',
          columns: {},
        },
      ],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilter],
}

module.exports = {
  ageBreakdownReport3,
}
