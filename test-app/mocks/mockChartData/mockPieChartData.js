const mockPieChartData = [
  {
    id: 'pie_chart-1',
    data: {
      details: {
        headlines: [],
        meta: [
          {
            label: 'Data for Period',
            value: '6th Aug 2024 - 6th Sept 2024',
          },
          {
            label: 'Source data refreshed',
            value: 'Friday, 6 September 2024',
          },
        ],
      },
      chart: {
        type: 'doughnut',
        unit: 'number',
        data: {
          labels: ['Red Red RedRed Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: 'No of prisoners',
              data: [12, 19, 3, 5, 2, 10],
              total: [12, 19, 3, 5, 2, 10].reduce((acc, val) => acc + val, 0),
            },
          ],
        },
      },
      table: {
        head: [{ text: 'Colours' }, { text: 'No of prisoners' }],
        rows: [
          [{ text: 'Red' }, { text: '12' }],
          [{ text: 'Blue' }, { text: '19' }],
          [{ text: 'Yellow' }, { text: '3' }],
          [{ text: 'Green' }, { text: '5' }],
          [{ text: 'Purple' }, { text: '2' }],
          [{ text: 'Orange' }, { text: '10' }],
        ],
      },
    },
  },
  {
    id: 'pie_chart-2',
    data: {
      details: {
        headlines: [],
        meta: [
          {
            label: 'Data for Period',
            value: '6th Aug 2024 - 6th Sept 2024',
          },
          {
            label: 'Source data refreshed',
            value: 'Friday, 6 September 2024',
          },
        ],
      },
      chart: {
        type: 'doughnut',
        unit: 'number',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green'],
          datasets: [
            {
              label: 'No of prisoners',
              data: [12, 19, 3, 5],
              total: [12, 19, 3, 5].reduce((acc, val) => acc + val, 0),
            },
            {
              label: 'No of Staff',
              data: [17, 10, 6, 9],
              total: [17, 10, 6, 9].reduce((acc, val) => acc + val, 0),
            },
          ],
        },
      },
      table: {
        head: [{ text: 'Colours' }, { text: 'No of prisoners' }, { text: 'No of Staff' }],
        rows: [
          [{ text: 'Red' }, { text: '12' }, { text: '17' }],
          [{ text: 'Blue' }, { text: '19' }, { text: '10' }],
          [{ text: 'Yellow' }, { text: '3' }, { text: '6' }],
          [{ text: 'Green' }, { text: '5' }, { text: '9' }],
        ],
      },
    },
  },
]

module.exports = mockPieChartData
