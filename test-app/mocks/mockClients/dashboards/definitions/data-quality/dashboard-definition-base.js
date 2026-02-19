// @ts-nocheck
const { establishmentIdFilter } = require('../../filter-definitions')
const {
  mockMetricOneBarChart,
  mockMetricOnePieChart,
  mockMetricTwoBarChart,
  mockMetricTwoPieChart,
  mockMetricThreeBarChart,
  mockMetricThreePieChart,
} = require('./visualisations')

const { lists } = require('../examples/visualisations')

const dataQualityDashboardBase = {
  id: 'data-quality-dashboard-base',
  name: 'Dashboard structure',
  description:
    'A dashboard is made up of multiple sections. Each section can have a title, description, and multiple visualisation types',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1',
      description: 'Section 1 description',
      visualisations: [mockMetricOneBarChart, mockMetricOnePieChart],
    },
    {
      id: 'section-2',
      display: 'Section 2',
      description: 'Section 1 description',
      visualisations: [mockMetricTwoBarChart, mockMetricTwoPieChart],
    },
    {
      id: 'section-2',
      display: 'section 3',
      description: 'Section 1 description',
      visualisations: [mockMetricThreeBarChart, mockMetricThreePieChart],
    },
    {
      id: 'section-3',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}

module.exports = {
  dataQualityDashboardBase,
}
