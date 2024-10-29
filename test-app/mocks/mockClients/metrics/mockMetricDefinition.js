const mockMetricDefinition1 = {
  id: 'test-metric-id-1',
  name: 'Missing Ethnicity By Establishment',
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
  name: 'Percentage Missing Ethnicity By Establishment',
  display: 'Percentage Missing Ethnicity By Establishment Metric',
  description: 'Percentage Missing Ethnicity By Establishment Metric',
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
  ],
}

const mockMetricDefinition3 = {
  id: 'test-metric-id-3',
  name: 'Missing Ethnicity By Establishment',
  display: 'Missing Ethnicity By Establishment',
  description: 'Missing Ethnicity By Establishment',
  specification: [
    {
      name: 'establishment_id',
      display: 'Establishment ID',
      group: true,
    },
    {
      name: 'no_of_prisoners_without',
      display: 'Missing Ethnicity',
      chart: ['bar'],
    },
    {
      name: 'no_of_prisoners',
      display: 'With Ethnicity',
      chart: ['bar'],
    },
  ],
}

module.exports = [mockMetricDefinition1, mockMetricDefinition2, mockMetricDefinition3]
