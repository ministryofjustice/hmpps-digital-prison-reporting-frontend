// @ts-nocheck
const {
  mockMetricOneBarChart,
  mockMetricOnePieChart,
  mockMetricTwoBarChart,
  mockMetricTwoPieChart,
  mockMetricThreeBarChart,
  mockMetricThreePieChart,
  mockScorecardDefinitionMetricTwo,
  mockScorecardDefinitionNoMetricTwo,
  mockScorecardDefinitionMetricThree,
  mockScorecardGroupMetricThreeByEstablishment,
  mockScorecardGroupMetricTwoByEstablishment,
  mockScorecardGroupMetricOneByEstablishment,
  mockTargetScorecardDefinitionMetricThree,
  mockMetricOneBarChartList,
} = require('../data-quality/visualisations')
const { lists } = require('../examples/visualisations')

const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const testingDashboard1 = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard',
  description: 'Dashboard used for testing',
  sections: [
    {
      id: 'test-section-1',
      display: 'Section 1 - MetricOne charts',
      description: 'Section 1 description - charts showing MetricOne data',
      visualisations: [mockMetricOneBarChart, mockMetricOnePieChart, mockMetricOneBarChartList],
    },
    {
      id: 'test-section-2',
      display: 'Section 2 - MetricTwo charts',
      description: 'Section 2 description - charts showing MetricTwo data',
      visualisations: [mockMetricTwoBarChart, mockMetricTwoPieChart],
    },
    {
      id: 'test-section-3',
      display: 'Section 3 - MetricThree charts',
      description: 'Section 3 description - charts showing MetricThree data',
      visualisations: [mockMetricThreeBarChart, mockMetricThreePieChart],
    },
    {
      id: 'test-section-4',
      display: 'Section 4 - Individual Scorecards',
      description: 'Section 4 description - Testing individually defined scorecards',
      visualisations: [
        mockScorecardDefinitionMetricTwo,
        mockScorecardDefinitionNoMetricTwo,
        mockScorecardDefinitionMetricThree,
      ],
    },
    {
      id: 'test-section-5',
      display: 'Section 5 - Individual Scorecards targeting values',
      description: 'Section 5 description - Testing individually defined scorecards that target specfic column value',
      visualisations: [mockTargetScorecardDefinitionMetricThree],
    },
    {
      id: 'test-section-6',
      display: 'Section 6 - Scorecard Group',
      description: 'Section 6 description - Testing scorecard groups created from list data',
      visualisations: [
        mockScorecardGroupMetricThreeByEstablishment,
        mockScorecardGroupMetricTwoByEstablishment,
        mockScorecardGroupMetricOneByEstablishment,
      ],
    },
    // {
    //   id: 'test-section-7',
    //   display: 'Section 7 - Timeseries charts',
    //   description: 'Section 7 description - Testing timeseries charts',
    //   visualisations: [mockMetricOneLineChartTimeseries],
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
