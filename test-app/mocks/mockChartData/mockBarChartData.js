const mockBarChartData = [
  {
    id: 'bar-chart-1',
    title: 'Prisoners favourite colours',
    description: 'Prisoners favourite colours',
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
    data: {
      chart: [
        {
          type: 'bar',
          unit: 'number',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'No of prisoners',
                data: [12, 19, 3, 5, 2, 10],
                total: [12, 19, 3, 5, 2, 10].reduce((acc, val) => acc + val, 0),
              },
            ],
            axis: 'x',
          },
        },
      ],
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
    id: 'bar-chart-2',
    title: 'Prisoners and Staff favourite colours',
    description: 'Prisoners and Staff favourite colours',
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
    data: {
      chart: [
        {
          type: 'bar',
          unit: 'number',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'No of prisoners',
                data: [12, 19, 3, 5, 2, 10],
                total: [12, 19, 3, 5, 2, 10].reduce((acc, val) => acc + val, 0),
              },
              {
                label: 'No of Staff',
                data: [17, 10, 6, 9, 6, 8],
                total: [17, 10, 6, 9, 6, 8].reduce((acc, val) => acc + val, 0),
              },
            ],
            axis: 'x',
          },
        },
      ],
      table: {
        head: [{ text: 'Colours' }, { text: 'No of prisoners' }, { text: 'No of Staff' }],
        rows: [
          [{ text: 'Red' }, { text: '12' }, { text: '17' }],
          [{ text: 'Blue' }, { text: '19' }, { text: '10' }],
          [{ text: 'Yellow' }, { text: '3' }, { text: '6' }],
          [{ text: 'Green' }, { text: '5' }, { text: '9' }],
          [{ text: 'Purple' }, { text: '2' }, { text: '6' }],
          [{ text: 'Orange' }, { text: '10' }, { text: '8' }],
        ],
      },
    },
  },
  {
    id: 'bar-chart-3',
    title: 'Prisoners and Staff favourite colours',
    description: 'Prisoners and Staff favourite colours',
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
    data: {
      chart: [
        {
          type: 'bar',
          unit: 'number',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'No of Prisoners',
                data: [12, 19, 3, 5, 2, 10],
                total: [12, 19, 3, 5, 2, 10].reduce((acc, val) => acc + val, 0),
              },
              {
                label: 'No of Staff',
                data: [17, 10, 6, 9, 6, 8],
                total: [17, 10, 6, 9, 6, 8].reduce((acc, val) => acc + val, 0),
              },
            ],
            axis: 'x',
            stacked: true,
          },
        },
      ],
      table: {
        head: [{ text: 'Colours' }, { text: 'No of Prisoners' }, { text: 'No of Staff' }],
        rows: [
          [{ text: 'Red' }, { text: '12' }, { text: '17' }],
          [{ text: 'Blue' }, { text: '19' }, { text: '10' }],
          [{ text: 'Yellow' }, { text: '3' }, { text: '6' }],
          [{ text: 'Green' }, { text: '5' }, { text: '9' }],
          [{ text: 'Purple' }, { text: '2' }, { text: '6' }],
          [{ text: 'Orange' }, { text: '10' }, { text: '8' }],
        ],
      },
    },
  },
  {
    id: 'bar-chart-4',
    title: 'Prisoners and Staff and pets favourite colours',
    description: 'Prisoners and Staff and pets favourite colours',
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
    data: {
      chart: [
        {
          type: 'bar',
          unit: 'number',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'No of Prisoners',
                data: [12, 19, 3, 5, 2, 10],
                total: [12, 19, 3, 5, 2, 10].reduce((acc, val) => acc + val, 0),
              },
              {
                label: 'No of Staff',
                data: [17, 10, 6, 9, 6, 8],
                total: [17, 10, 6, 9, 6, 8].reduce((acc, val) => acc + val, 0),
              },
              {
                label: 'No of Pets',
                data: [17, 10, 6, 5, 12, 8],
                total: [17, 10, 6, 5, 12, 8].reduce((acc, val) => acc + val, 0),
              },
            ],
            axis: 'x',
          },
        },
      ],
      table: {
        head: [{ text: 'Colours' }, { text: 'No of Prisoners' }, { text: 'No of Staff' }],
        rows: [
          [{ text: 'Red' }, { text: '12' }, { text: '17' }, { text: '17' }],
          [{ text: 'Blue' }, { text: '19' }, { text: '10' }, { text: '10' }],
          [{ text: 'Yellow' }, { text: '3' }, { text: '6' }, { text: '6' }],
          [{ text: 'Green' }, { text: '5' }, { text: '9' }, { text: '5' }],
          [{ text: 'Purple' }, { text: '2' }, { text: '6' }, { text: '12' }],
          [{ text: 'Orange' }, { text: '10' }, { text: '8' }, { text: '8' }],
        ],
      },
    },
  },
]

module.exports = mockBarChartData
