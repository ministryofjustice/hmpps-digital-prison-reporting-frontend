const mockDashboardDefinition1 = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Test Dashboard 1 Description',
  template: '',
  metrics: [
    {
      id: 'test-metric-id-1',
      visualisationType: ['bar'],
    },
    {
      id: 'test-metric-id-1',
      visualisationType: ['dougnut'],
    },
  ],
}

module.exports = [mockDashboardDefinition1]
