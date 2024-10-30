const mockMetricData1 = {
  id: 'test-metric-id-1',
  data: [
    {
      establishment_id: 'KMI',
      missing_ethnicity_percentage: 25.09,
      present_ethnicity_percentage: 75.91,
      no_of_prisoners: 300,
      no_of_prisoners_without: 100,
      random_data: 20,
    },
    {
      establishment_id: 'LEI',
      missing_ethnicity_percentage: 47.09,
      present_ethnicity_percentage: 52.91,
      no_of_prisoners: 100,
      no_of_prisoners_without: 50,
      random_data: 50,
    },
  ],
  updated: 'string',
}

const mockMetricData2 = {
  id: 'test-metric-id-2',
  data: [
    {
      establishment_id: 'KMI',
      missing_ethnicity_percentage: 25.09,
      present_ethnicity_percentage: 75.91,
    },
  ],
  updated: 'string',
}

const mockMetricData3 = {
  id: 'test-metric-id-3',
  data: [
    {
      establishment_id: 'KMI',
      no_of_prisoners: 300,
      no_of_prisoners_without: 100,
    },
  ],
  updated: 'string',
}

module.exports = {
  'test-metric-id-1': mockMetricData1,
  'test-metric-id-2': mockMetricData2,
  'test-metric-id-3': mockMetricData3,
}
