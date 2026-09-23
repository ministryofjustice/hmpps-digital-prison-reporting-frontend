// @ts-nocheck

const matrixChartData = [
  {
    y: 'Apr',
    x: '26',
    v: 14,
    c: '#1D70B8AA',
  },
  {
    y: 'May',
    x: '26',
    v: 7,
    c: '#1D70B855',
  },
  {
    y: 'Jun',
    x: '26',
    v: 24,
    c: '#1D70B8FF',
  },
  {
    y: 'Jul',
    x: '26',
    v: 6,
    c: '#1D70B855',
  },
  {
    y: 'Aug',
    x: '26',
    v: 12,
    c: '#1D70B855',
  },
  {
    y: 'Sep',
    x: '26',
    v: 14,
    c: '#1D70B8AA',
  },
]

const mockMatrixChartData = [
  {
    id: 'matrix-chart-1',
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
        type: 'matrix',
        unit: 'number',
        data: {
          datasets: [
            {
              label: 'Total finds',
              data: matrixChartData,
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
                position: 'left',
                type: 'category',
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                offset: true,
                ticks: {
                  padding: 1,
                  maxRotation: 0,
                  stepSize: 1,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
              x: {
                position: 'top',
                type: 'category',
                labels: ['26'],
                offset: true,
                ticks: {
                  padding: 1,
                  maxRotation: 0,
                  stepSize: 1,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
              },
            },
          },
        },
      },
    },
  },
]

module.exports = mockMatrixChartData
