// @ts-nocheck
const childDashboard1 = {
  id: 'child-dashboard-one',
  name: 'child two Dashboard',
  description: 'Dashboard used for mocking child dashboards',
  sections: [
    {
      id: 'child-one-section-1',
      display: 'Child one - Section 1',
      description: 'Child one - Section 1 description',
      visualisations: [],
    },
    {
      id: 'child-one-section-2',
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

module.exports = childDashboard1
