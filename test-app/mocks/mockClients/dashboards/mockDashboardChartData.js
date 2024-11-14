const missingEthnicityChartData = {
  id: 'missing-ethnicity-metric',
  title: 'Missing ethnicity',
  description: 'Number of prisoners with missing ethnicity data',
  data: {
    chart: [
      {
        type: 'bar',
        unit: 'number',
        data: {
          labels: ['No. of Prisoners with ethnicity', 'No. of Prisoners with no ethnicity'],
          datasets: [
            {
              label: 'KMI',
              data: [300, 100],
              total: 400,
            },
            {
              label: 'LEI',
              data: [100, 50],
              total: 150,
            },
          ],
        },
      },
      {
        type: 'doughnut',
        unit: 'percentage',
        data: {
          labels: ['Percentage of Prisoners with ethnicity', 'Percentage of Prisoners with no ethnicity'],
          datasets: [
            {
              label: 'KMI',
              data: [25.09, 74.91],
              total: 100,
            },
            {
              label: 'LEI',
              data: [47.09, 52.91],
              total: 100,
            },
          ],
        },
      },
    ],
    table: {
      head: [
        {
          text: 'Establishment ID',
        },
        {
          text: 'No. of Prisoners with ethnicity',
        },
        {
          text: 'No. of Prisoners with no ethnicity',
        },
        {
          text: 'Percentage of Prisoners with ethnicity',
        },
        {
          text: 'Percentage of Prisoners with no ethnicity',
        },
      ],
      rows: [
        [
          {
            text: 'KMI',
          },
          {
            text: 300,
          },
          {
            text: 100,
          },
          {
            text: 25.09,
          },
          {
            text: 74.91,
          },
        ],
        [
          {
            text: 'LEI',
          },
          {
            text: 100,
          },
          {
            text: 50,
          },
          {
            text: 47.09,
          },
          {
            text: 52.91,
          },
        ],
      ],
    },
  },
}

module.exports = {
  missingEthnicityChartData,
}
