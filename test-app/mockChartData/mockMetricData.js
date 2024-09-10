const mockMetricData1 = [
  { photographStatus: 'Without', noOfPrisoners: 33 },
  { photographStatus: 'Older than 2 years', noOfPrisoners: 27 },
  { photographStatus: 'Under 2 years', noOfPrisoners: 40 },
]

const mockMetricData2 = [
  { photographStatus: 'Without', noOfPrisoners: 40 },
  { photographStatus: 'Older than 2 years', noOfPrisoners: 20 },
  { photographStatus: 'Under 2 years', noOfPrisoners: 40 },
]

const mockMetricData3 = [
  { photographStatus: 'Without', noOfPrisoners: 10 },
  { photographStatus: 'Older than 2 years', noOfPrisoners: 30 },
  { photographStatus: 'Under 2 years', noOfPrisoners: 70 },
]

module.exports = {
  'test-metric-id-1': mockMetricData1,
  'test-metric-id-2': mockMetricData2,
  'test-metric-id-3': mockMetricData3,
}
