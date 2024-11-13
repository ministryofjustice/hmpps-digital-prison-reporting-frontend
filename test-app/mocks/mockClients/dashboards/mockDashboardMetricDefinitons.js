const mockDashboardMetricDefMissingEthnicity = {
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
          display: 'No. of Prisoners with no ethnicity',
        },
      ],
    },
    {
      type: 'doughnut',
      label: {
        name: 'establishment_id',
        display: 'Establishment ID',
      },
      unit: 'percentage',
      columns: [
        {
          name: 'has_ethnicity_percentage',
          display: 'Percentage of Prisoners with ethnicity',
        },
        {
          name: 'has_no_ethnicity_percentage',
          display: 'Percentage of Prisoners with no ethnicity',
        },
      ],
    },
  ],
}

module.exports = {
  mockDashboardMetricDefMissingEthnicity,
}
