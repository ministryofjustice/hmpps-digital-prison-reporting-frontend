const mockDashboardDefinition1 = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  dataset: {
    id: 'a-dateset',
    dimension: { id: 'establishment' },
  },
  loadType: 'async',
  metrics: [
    {
      id: 'missing-ethnicity-metric',
      name: 'Missing Ethnicity',
      display: 'Missing Ethnicity',
      description: 'Missing Ethnicity',
      charts: [
        {
          type: 'bar',
          label: {
            name: 'establishment_id',
            display: 'Establishment ID',
          },
          unit: 'number',
          columns: [
            {
              name: 'has_ethnicity',
              display: 'No. of Prisoners with ethnicity',
            },
            {
              name: 'has_no_ethnicity',
              display: 'No. of Prisoners with ethnicity',
            },
          ],
        },
        {
          type: 'pie',
          label: {
            name: 'establishment_id',
            display: 'Establishment ID',
          },
          unit: 'percentage',
          columns: [
            {
              name: 'has_ethnicity_percentage',
              display: 'No. of Prisoners with ethnicity',
            },
            {
              name: 'has_no_ethnicity_percentage',
              display: 'No. of Prisoners with ethnicity',
            },
          ],
        },
      ],
    },
  ],
}

module.exports = [mockDashboardDefinition1]
