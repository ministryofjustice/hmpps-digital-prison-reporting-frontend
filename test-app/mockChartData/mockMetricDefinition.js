const mockMetricDefinition1 = {
  id: 'test-metric-id-1',
  name: 'testMetricId1',
  display: 'Prisoner Images by Status Percentage',
  description: 'Prisoner Images by Status Percentage',
  visualisationType: ['bar', 'doughnut'],
  specification: [
    {
      name: 'status',
      display: 'Status',
    },
    {
      name: 'percent',
      display: 'Percent',
      unit: 'percentage',
    },
  ],
}

module.exports = [mockMetricDefinition1]
