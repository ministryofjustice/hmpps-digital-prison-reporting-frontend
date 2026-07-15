// @ts-nocheck
const { lists, line } = require('../examples/visualisations')

const childDashboard1 = {
  id: 'child-dashboard-one',
  name: 'Child one dashboard',
  description: 'Dashboard used for mocking child dashboards',
  sections: [
    {
      id: 'child-one-section-1',
      display: 'Child one - Section 1',
      description: 'Child one - Section 1 description',
      visualisations: [line.dataQualityMetricTwoLine],
    },
    {
      id: 'child-one-section-2',
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [line.dataQualityMetricThreeLine],
    },
    {
      id: 'parent-section-1',
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [line.dataQualityLine],
    },
    {
      id: 'all-data',
      display: 'All Data',
      description: '',
      visualisations: [lists.fullDataset],
    },
  ],
}

module.exports = childDashboard1
