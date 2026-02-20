// @ts-nocheck
const barChartDataHasMetricOne = {
  details: {
    meta: [
      {
        label: 'Values for:',
        value: 'Jan 25',
      },
    ],
    headlines: [
      {
        label: 'Total has metricone',
        value: 1423,
      },
    ],
  },
  table: {
    head: [
      {
        text: 'Establishment ID',
      },
      {
        text: 'Has MetricOne',
      },
      {
        text: 'Has no MetricOne',
      },
    ],
    rows: [
      [
        {
          text: 'ABC',
        },
        {
          text: 533,
        },
        {
          text: 614,
        },
      ],
      [
        {
          text: 'GHI',
        },
        {
          text: 484,
        },
        {
          text: 713,
        },
      ],
      [
        {
          text: 'DEF',
        },
        {
          text: 406,
        },
        {
          text: 682,
        },
      ],
    ],
  },
  chart: {
    type: 'bar',
    options: {
      height: 5,
      timeseries: false,
    },
    data: {
      labels: ['Has MetricOne', 'Has no MetricOne'],
      datasets: [
        {
          label: 'ABC',
          data: [533, 614],
          total: 1147,
          backgroundColor: '#5694ca',
          borderColor: '#5694ca',
          borderWidth: [0, 0],
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
        {
          label: 'GHI',
          data: [484, 713],
          total: 1197,
          backgroundColor: '#912b88',
          borderColor: '#912b88',
          borderWidth: [0, 0],
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
        {
          label: 'DEF',
          data: [406, 682],
          total: 1088,
          backgroundColor: '#00703c',
          borderColor: '#00703c',
          borderWidth: [0, 0],
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
      ],
      config: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            backgroundColor: '#FFF',
            bodyColor: '#000',
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            titleColor: '#000',
            displayColors: false,
            borderWidth: 1,
            borderColor: '#b1b4b6',
            cornerRadius: 0,
            padding: 20,
            footerFont: {
              weight: 'bold',
            },
            animation: {
              duration: 0,
            },
          },
        },
        indexAxis: 'x',
      },
    },
  },
}

const barChartFromListDataHasMetricOne = {
  details: {
    meta: [
      {
        label: 'Values for:',
        value: 'Jan 25',
      },
    ],
    headlines: [
      {
        label: 'Total has metricone',
        value: 1423,
      },
    ],
  },
  table: {
    head: [
      {
        text: 'Establishment ID',
      },
      {
        text: 'Has MetricOne',
      },
      {
        text: 'Has no MetricOne',
      },
    ],
    rows: [
      [
        {
          text: 'ABC',
        },
        {
          text: 533,
        },
        {
          text: 614,
        },
      ],
      [
        {
          text: 'GHI',
        },
        {
          text: 484,
        },
        {
          text: 713,
        },
      ],
      [
        {
          text: 'DEF',
        },
        {
          text: 406,
        },
        {
          text: 682,
        },
      ],
    ],
  },
  chart: {
    type: 'bar',
    options: {
      height: 5,
      timeseries: false,
    },
    data: {
      labels: ['Has MetricOne', 'Has no MetricOne'],
      datasets: [
        {
          label: 'ABC',
          data: [533, 614],
          total: 1147,
          backgroundColor: '#5694ca',
          borderColor: '#5694ca',
          borderWidth: [0, 0],
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
        {
          label: 'GHI',
          data: [484, 713],
          total: 1197,
          backgroundColor: '#912b88',
          borderColor: '#912b88',
          borderWidth: [0, 0],
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
        {
          label: 'DEF',
          data: [406, 682],
          total: 1088,
          backgroundColor: '#00703c',
          borderColor: '#00703c',
          borderWidth: [0, 0],
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
      ],
      config: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            backgroundColor: '#FFF',
            bodyColor: '#000',
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            titleColor: '#000',
            displayColors: false,
            borderWidth: 1,
            borderColor: '#b1b4b6',
            cornerRadius: 0,
            padding: 20,
            footerFont: {
              weight: 'bold',
            },
            animation: {
              duration: 0,
            },
          },
        },
        indexAxis: 'x',
      },
    },
  },
}

const dataQualityTimeseriesLine = {
  details: {
    meta: [
      {
        label: 'Values for:',
        value: 'Jan 25',
      },
    ],
    headlines: [
      {
        label: 'Jan 25',
        value: 533,
      },
    ],
  },
  table: {
    head: [{ text: 'Date' }, { text: 'Establishment ID' }, { text: 'Has MetricOne' }],
    rows: [
      [{ text: 'Aug 24' }, { text: 'ABC' }, { text: 424 }],
      [{ text: 'Aug 24' }, { text: 'GHI' }, { text: 761 }],
      [{ text: 'Aug 24' }, { text: 'DEF' }, { text: 401 }],
      [{ text: 'Sep 24' }, { text: 'ABC' }, { text: 733 }],
      [{ text: 'Sep 24' }, { text: 'GHI' }, { text: 559 }],
      [{ text: 'Sep 24' }, { text: 'DEF' }, { text: 656 }],
      [{ text: 'Oct 24' }, { text: 'ABC' }, { text: 738 }],
      [{ text: 'Oct 24' }, { text: 'GHI' }, { text: 692 }],
      [{ text: 'Oct 24' }, { text: 'DEF' }, { text: 665 }],
      [{ text: 'Nov 24' }, { text: 'ABC' }, { text: 479 }],
      [{ text: 'Nov 24' }, { text: 'GHI' }, { text: 635 }],
      [{ text: 'Nov 24' }, { text: 'DEF' }, { text: 482 }],
      [{ text: 'Dec 24' }, { text: 'ABC' }, { text: 467 }],
      [{ text: 'Dec 24' }, { text: 'GHI' }, { text: 577 }],
      [{ text: 'Dec 24' }, { text: 'DEF' }, { text: 660 }],
      [{ text: 'Jan 25' }, { text: 'ABC' }, { text: 533 }],
      [{ text: 'Jan 25' }, { text: 'GHI' }, { text: 484 }],
      [{ text: 'Jan 25' }, { text: 'DEF' }, { text: 406 }],
    ],
  },
  chart: {
    type: 'line',
    options: {
      timeseries: true,
    },
    data: {
      labels: ['Aug 24', 'Sep 24', 'Oct 24', 'Nov 24', 'Dec 24', 'Jan 25'],
      datasets: [
        {
          data: [424, 733, 738, 479, 467, 533],
          label: 'ABC',
          total: 3374,
          pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 10,
          pointHitRadius: 20,
          datalabels: {
            display: false,
          },
          backgroundColor: '#5694ca',
          borderColor: '#5694ca',
        },
        {
          data: [761, 559, 692, 635, 577, 484],
          label: 'GHI',
          total: 3708,
          pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 10,
          pointHitRadius: 20,
          datalabels: {
            display: false,
          },
          backgroundColor: '#912b88',
          borderColor: '#912b88',
        },
        {
          data: [401, 656, 665, 482, 660, 406],
          label: 'DEF',
          total: 3270,
          pointStyle: 'circle',
          pointRadius: 4,
          pointHoverRadius: 10,
          pointHitRadius: 20,
          datalabels: {
            display: false,
          },
          backgroundColor: '#00703c',
          borderColor: '#00703c',
        },
      ],
      config: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            backgroundColor: '#FFF',
            bodyColor: '#000',
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            titleColor: '#000',
            displayColors: false,
            borderWidth: 1,
            borderColor: '#b1b4b6',
            cornerRadius: 0,
            padding: 20,
            footerFont: {
              weight: 'bold',
            },
            animation: {
              duration: 0,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            ticks: {
              fontSize: 12,
            },
          },
          x: {
            ticks: {
              fontSize: 12,
            },
          },
        },
      },
    },
  },
}

const chartFromList = {
  details: {
    meta: [
      {
        label: 'Values for:',
        value: 'Feb 25',
      },
    ],
    headlines: [
      {
        label: 'Total total prisoners',
        value: 1172,
      },
    ],
  },
  table: {
    head: [
      {
        text: 'Establishment ID',
      },
      {
        text: 'Diet',
      },
      {
        text: 'Total prisoners',
      },
    ],
    rows: [
      [
        {
          text: 'ABC',
        },
        {
          text: 'DietOne',
        },
        {
          text: '251',
        },
      ],
      [
        {
          text: 'ABC',
        },
        {
          text: 'DietTwo',
        },
        {
          text: '317',
        },
      ],
      [
        {
          text: 'ABC',
        },
        {
          text: 'DietThree',
        },
        {
          text: '330',
        },
      ],
      [
        {
          text: 'ABC',
        },
        {
          text: 'DietFour',
        },
        {
          text: '274',
        },
      ],
    ],
  },
  chart: {
    type: 'bar',
    options: {
      height: 5,
      timeseries: false,
    },
    data: {
      labels: ['DietOne', 'DietTwo', 'DietThree', 'DietFour'],
      datasets: [
        {
          label: 'ABC',
          data: [251, 317, 330, 274],
          total: 1172,
          borderWidth: [0, 0],
          backgroundColor: '#5694ca',
          borderColor: '#5694ca',
          datalabels: {
            align: 'center',
            anchor: 'bottom',
          },
        },
      ],
      config: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            backgroundColor: '#FFF',
            bodyColor: '#000',
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            titleColor: '#000',
            displayColors: false,
            borderWidth: 1,
            borderColor: '#b1b4b6',
            cornerRadius: 0,
            padding: 20,
            footerFont: {
              weight: 'bold',
            },
            animation: {
              duration: 0,
            },
          },
        },
        indexAxis: 'x',
      },
    },
  },
}

module.exports = {
  barChartDataHasMetricOne,
  barChartFromListDataHasMetricOne,
  dataQualityTimeseriesLine,
  chartFromList,
}
