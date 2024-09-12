const mockMetricData1 = {
  id: 'test-metric-id-1',
  data: [
    { status: 'Without', percent: 33 },
    { status: 'Older than 2 years', percent: 27 },
    { status: 'Under 2 years', percent: 40 },
  ],
  updated: 'asdasdasd',
}

module.exports = {
  'test-metric-id-1': mockMetricData1,
}
