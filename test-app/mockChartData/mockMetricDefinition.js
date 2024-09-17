const mockMetricDefinition1 = {
  id: 'test-metric-id-1',
  name: 'Missing Ethnicity By Establishment Metric',
  display: 'Missing Ethnicity By Establishment Metric',
  description: 'Missing Ethnicity By Establishment Metric',
  specification: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
      group: true,
    },
    {
      name: 'missing_ethnicity_percentage',
      display: '% Missing Ethnicity',
      chart: ['doughnut'],
      unit: 'percentage',
    },
    {
      name: 'present_ethnicity_percentage',
      display: '% With Ethnicity',
      unit: 'percentage',
      chart: ['doughnut'],
    },
    {
      name: 'no_of_prisoners',
      display: 'No. of Prisoners with ethnicity',
      chart: ['bar'],
    },
    {
      name: 'no_of_prisoners_without',
      display: 'No. of Prisoners without ethnicity',
      chart: ['bar'],
    },
    {
      name: 'random_data',
      display: 'Random Data ',
    },
  ],
}

const mockMetricDefinition2 = {
  id: 'test-metric-id-2',
  name: 'Missing Ethnicity By Establishment Metric',
  display: 'Missing Ethnicity By Establishment Metric',
  description: 'Missing Ethnicity By Establishment Metric',
  specification: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
      group: true,
    },
    {
      name: 'missing_ethnicity_percentage',
      display: '% Missing Ethnicity',
      chart: ['doughnut', 'bar'],
      unit: 'percentage',
    },
    {
      name: 'present_ethnicity_percentage',
      display: '% With Ethnicity',
      unit: 'percentage',
      chart: ['doughnut', 'bar'],
    },
  ],
}

module.exports = [mockMetricDefinition1, mockMetricDefinition2]
