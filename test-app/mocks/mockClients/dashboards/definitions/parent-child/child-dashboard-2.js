// @ts-nocheck
const { lists } = require('../examples/visualisations')

const childDashboard2 = {
  id: 'child-dashboard-two',
  name: 'Child two dashboard',
  description: 'Dashboard used for mocking child dashboards',
  sections: [
    {
      id: 'child-two-section-1',
      display: 'Child two - Section 1',
      description: 'Child two - Section 1 description',
      visualisations: [],
    },
    {
      id: 'child-two-section-2',
      display: 'Child two - Section 2',
      description: 'Child two - Section 2 description',
      visualisations: [],
    },
    {
      id: 'parent-section-2',
      display: 'Child one - Section 2',
      description: 'Child one - Section 2 - description',
      visualisations: [],
    },
    {
      id: 'all-data',
      display: 'All Data',
      description: '',
      visualisations: [lists.fullDataset],
    },
  ],
}

module.exports = childDashboard2
