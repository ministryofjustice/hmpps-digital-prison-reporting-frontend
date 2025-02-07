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

const missingEthnicityTimeseriesChartData = {
  chart: [
    {
      type: 'line',
      unit: 'number',
      timeseries: true,
      data: {
        labels: ['Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25'],
        datasets: [
          {
            data: [781, 514, 598, 522, 431, 614],
            label: 'MDI',
            total: 3460,
          },
          {
            data: [610, 518, 676, 790, 536, 713],
            label: 'SLI',
            total: 3843,
          },
          {
            data: [499, 521, 687, 713, 590, 682],
            label: 'DAI',
            total: 3692,
          },
        ],
      },
    },
    {
      type: 'bar',
      unit: 'number',
      timeseries: true,
      data: {
        labels: ['Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25'],
        datasets: [
          {
            data: [781, 514, 598, 522, 431, 614],
            label: 'MDI',
            total: 3460,
          },
          {
            data: [610, 518, 676, 790, 536, 713],
            label: 'SLI',
            total: 3843,
          },
          {
            data: [499, 521, 687, 713, 590, 682],
            label: 'DAI',
            total: 3692,
          },
        ],
      },
    },
  ],
  table: {
    head: [
      {
        text: 'Date',
      },
      {
        text: 'MDI',
      },
      {
        text: 'SLI',
      },
      {
        text: 'DAI',
      },
    ],
    rows: [
      [
        {
          text: 'Aug 24',
        },
        {
          text: 781,
        },
        {
          text: 610,
        },
        {
          text: 499,
        },
      ],
      [
        {
          text: 'Sep 24',
        },
        {
          text: 514,
        },
        {
          text: 518,
        },
        {
          text: 521,
        },
      ],
      [
        {
          text: 'Oct 24',
        },
        {
          text: 598,
        },
        {
          text: 676,
        },
        {
          text: 687,
        },
      ],
      [
        {
          text: 'Nov 24',
        },
        {
          text: 522,
        },
        {
          text: 790,
        },
        {
          text: 713,
        },
      ],
      [
        {
          text: 'Dec 24',
        },
        {
          text: 431,
        },
        {
          text: 536,
        },
        {
          text: 590,
        },
      ],
      [
        {
          text: 'Jan 25',
        },
        {
          text: 614,
        },
        {
          text: 713,
        },
        {
          text: 682,
        },
      ],
    ],
  },
}

module.exports = {
  missingEthnicityChartData,
  missingEthnicityTimeseriesChartData,
}
