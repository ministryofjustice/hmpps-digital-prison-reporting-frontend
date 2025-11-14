// @ts-nocheck
const lineChartData = [
  [100, 130, 80, 60, 99, 50, 65, 100, 130, 80, 60, 99],
  [60, 70, 50, 40, 5, 20, 43, 60, 70, 50, 40, 5],
  [18, 50, 45, 90, 120, 59, 72, 110, 32, 28, 57, 45],
  [5, 32, 23, 40, 70, 32, 43, 60, 7, 12, 8, 21],
]

const mockLineChartData = [
  {
    id: 'line-chart-1',
    data: {
      details: {
        headlines: [],
        meta: [
          {
            label: 'Data for Period',
            value: '1st Jan 2022 - 30th Dec 2023',
          },
          {
            label: 'Source data refreshed',
            value: 'Friday, 6 September 2024',
          },
        ],
      },
      chart: {
        type: 'line',
        unit: 'number',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Assaults',
              data: lineChartData[0],
              total: lineChartData[0].reduce((a, c) => a + c, 0),
            },
          ],
        },
      },
    },
  },
  {
    id: 'line-chart-2',
    data: {
      details: {
        headlines: [],
        meta: [
          {
            label: 'Data for Period',
            value: '1st Jan 2022 - 30th Dec 2023',
          },
          {
            label: 'Source data refreshed',
            value: 'Friday, 6 September 2024',
          },
        ],
      },
      chart: {
        type: 'line',
        unit: 'number',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Assaults',
              data: lineChartData[2],
              total: lineChartData[2].reduce((a, c) => a + c, 0),
            },
            {
              label: 'Serious',
              data: lineChartData[3],
              total: lineChartData[3].reduce((a, c) => a + c, 0),
            },
          ],
        },
      },
    },
  },
  {
    id: 'line-chart-3',
    data: {
      details: {
        headlines: [],
        meta: [
          {
            label: 'Data for Period',
            value: '21st Jan 2024 - 23rd Jan 2024',
          },
          {
            label: 'Source data refreshed',
            value: 'Friday, 6 September 2024',
          },
        ],
      },
      chart: {
        type: 'line',
        unit: 'number',
        data: {
          labels: ['Jan 21', 'Jan 22', 'jan 23'],
          datasets: [
            {
              label: 'Cutting',
              data: [20, 50, 60],
              total: [20, 50, 60].reduce((a, c) => a + c, 0),
            },
            {
              label: 'Suffocation',
              data: [10, 34, 40],
              total: [10, 34, 40].reduce((a, c) => a + c, 0),
            },
            {
              label: 'Ingestion',
              data: [4, 16, 23],
              total: [4, 16, 23].reduce((a, c) => a + c, 0),
            },
            {
              label: 'Other',
              data: [2, 4, 8],
              total: [2, 4, 8].reduce((a, c) => a + c, 0),
            },
          ],
        },
      },
    },
  },
]

module.exports = mockLineChartData
