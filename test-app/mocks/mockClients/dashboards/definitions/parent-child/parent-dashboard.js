// @ts-nocheck
const { lists } = require('../examples/visualisations')

const child1 = require('./child-dashboard-1')
const child2 = require('./child-dashboard-2')

const parentDashboard1 = {
  id: 'parent-dashboard',
  name: 'Parent Dashboard',
  description: 'Dashboard used for mocking parent-child dashboards',
  childVariants: [
    child1,
    child2
  ],
  sections: [
    {
      id: 'parent-section-1',
      display: 'Parent - Section 1',
      description: 'Parent Section 1 description',
      visualisations: [],
    },
    {
      id: 'parent-section-2',
      display: 'Parent - Section 2',
      description: 'Parent Section 2 description',
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

module.exports = parentDashboard1
