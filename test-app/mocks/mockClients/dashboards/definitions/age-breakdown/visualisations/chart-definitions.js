// @ts-nocheck
const mockBarChartMetricThree = {
  id: 'MetricThree-bar',
  type: 'bar',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'MetricThree_description',
        display: 'MetricThree Description',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'No of prisoners',
        axis: 'y',
      },
    ],
  },
}

const mockPieChartMetricThree = {
  id: 'MetricThree-doughhut',
  type: 'doughnut',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'MetricThree_description',
        display: 'MetricThree Description',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'No of prisoners',
        axis: 'y',
      },
    ],
    ignoreRemainingColumns: true,
  },
}

module.exports = {
  mockBarChartMetricThree,
  mockPieChartMetricThree,
}
