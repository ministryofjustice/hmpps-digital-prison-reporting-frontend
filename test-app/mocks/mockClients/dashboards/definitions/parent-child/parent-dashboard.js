// @ts-nocheck
const child1 = require('./child-dashboard-1')
const child2 = require('./child-dashboard-2')

const parentDashboard1 = {
  id: 'parent-dashboard',
  name: 'parent Dashboard',
  description: 'Dashboard used for mocking parent-child dashboards',
  childVariant: [
    child1,
    child2
  ],
  sections: [
    {
      id: 'parent-section-1',
      display: 'Parent - Section 1',
      description: 'Section 1 description - charts showing MetricOne data',
      visualisations: [],
    },
    {
      id: 'parent-section-2',
      display: 'Parent - Section 2',
      description: 'Section 2 description - charts showing MetricTwo data',
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
