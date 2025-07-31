const mockBarChartData = [
  {
    id: 'multi_chart-0',
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
        type: 'bar',
        unit: 'number',
        data: {
          labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
          datasets: [
            {
              label: 'No. of finds',
              data: [12, 19, 3, 5],
              total: [12, 19, 3, 5].reduce((acc, val) => acc + val, 0),
            },
          ],
        },
      },
      table: {
        head: [{ text: 'Colours' }, { text: 'No. of finds' }],
        rows: [
          [{ text: 'Drugs' }, { text: '12' }],
          [{ text: 'Phones' }, { text: '19' }],
          [{ text: 'Weapons' }, { text: '3' }],
          [{ text: 'Alcohol' }, { text: '5' }],
        ],
      },
    },
  },
  {
    id: 'multi_chart-1',
    data: {
      details: {
        headlines: [
          {
            label: 'Total',
            value: [12, 19, 3, 5, 2, 10].reduce((acc, val) => acc + val, 0),
            legend: 'No. of Finds',
          },
        ],
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
        type: 'bar',
        unit: 'number',
        data: {
          labels: ['Drugs', 'Phones', 'Weapons', 'Alcohol'],
          datasets: [
            {
              label: 'No. of finds',
              data: [12, 19, 3, 5],
              total: [12, 19, 3, 5].reduce((acc, val) => acc + val, 0),
            },
          ],
        },
      },
      table: {
        head: [{ text: 'Colours' }, { text: 'No. of finds' }],
        rows: [
          [{ text: 'Drugs' }, { text: '12' }],
          [{ text: 'Phones' }, { text: '19' }],
          [{ text: 'Weapons' }, { text: '3' }],
          [{ text: 'Alcohol' }, { text: '5' }],
        ],
      },
    },
  },
  {
    id: 'multi_chart-2',
    data: {
      details: {
        headlines: [
          {
            label: 'Total Serious',
            value: [50, 70].reduce((acc, val) => acc + val, 0),
          },
          {
            label: 'Total General',
            value: [18, 60].reduce((acc, val) => acc + val, 0),
          },
        ],
        meta: [
          {
            label: 'Data for Period',
            value: '6th Aug 2024 - 6th Sept 2024',
          },
          {
            label: 'Source date',
            value: 'Friday, 6 September 2024',
          },
        ],
      },
      chart: {
        type: 'bar',
        unit: 'number',
        data: {
          labels: ['General', 'Serious'],
          datasets: [
            {
              label: 'On Staff',
              data: [60, 70],
              total: [60, 70].reduce((acc, val) => acc + val, 0),
            },
            {
              label: 'On Prisoner',
              data: [18, 50],
              total: [18, 50].reduce((acc, val) => acc + val, 0),
            },
          ],
        },
      },
      table: {
        head: [{ text: 'Colours' }, { text: 'On Staff' }, { text: 'On Prisoner' }],
        rows: [
          [{ text: 'Serious' }, { text: '18' }, { text: '50' }],
          [{ text: 'General' }, { text: '60' }, { text: '70' }],
        ],
      },
    },
  },
]

module.exports = mockBarChartData
