// @ts-nocheck
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
} = require('../data-quality/visualisations')
const { lists } = require('../examples/visualisations')

const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const testingDashboard1 = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard',
  description: 'Dashboard used for testing testing',
  sections: [
    {
      id: 'test-section-1',
      display: 'Section 1 - Ethnicity charts',
      description: 'Section 1 description - charts showing ethnicity data',
      visualisations: [mockEthnicityBarChart, mockEthnicityPieChart, mockEthnicityBarChartList],
    },
    {
      id: 'test-section-2',
      display: 'Section 2 - Nationality charts',
      description: 'Section 2 description - charts showing nationality data',
      visualisations: [mockNationalityBarChart, mockNationalityPieChart],
    },
    {
      id: 'test-section-3',
      display: 'Section 3 - Religion charts',
      description: 'Section 3 description - charts showing religion data',
      visualisations: [mockReligionBarChart, mockReligionPieChart],
    },
    {
      id: 'test-section-4',
      display: 'Section 4 - Individual Scorecards',
      description: 'Section 4 description - Testing individually defined scorecards',
      visualisations: [
        mockScorecardDefinitionNationality,
        mockScorecardDefinitionNoNationality,
        mockScorecardDefinitionReligion,
      ],
    },
    {
      id: 'test-section-5',
      display: 'Section 5 - Individual Scorecards targeting values',
      description: 'Section 5 description - Testing individually defined scorecards that target specfic column value',
      visualisations: [mockTargetScorecardDefinitionReligion],
    },
    {
      id: 'test-section-6',
      display: 'Section 6 - Scorecard Group',
      description: 'Section 6 description - Testing scorecard groups created from list data',
      visualisations: [
        mockScorecardGroupReligionByEstablishment,
        mockScorecardGroupNationalityByEstablishment,
        mockScorecardGroupEthnicityByEstablishment,
      ],
    },
    // {
    //   id: 'test-section-7',
    //   display: 'Section 7 - Timeseries charts',
    //   description: 'Section 7 description - Testing timeseries charts',
    //   visualisations: [mockEthnicityLineChartTimeseries],
    // },
    {
      id: 'all-data',
      display: 'All Data',
      description: '',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = testingDashboard1
