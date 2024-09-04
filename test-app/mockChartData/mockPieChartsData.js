const mockBarChartData = [
  {
    id: 'chart-1',
    type: 'doughnut',
    labels: ['Red Red RedRed Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 10],
      },
    ],
  },
  {
    id: 'chart-2',
    type: 'doughnut',
    labels: ['Red', 'Blue', 'Yellow', 'Green'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5],
      },
    ],
  },
  {
    id: 'chart-3',
    type: 'doughnut',
    labels: ['Red', 'Blue', 'Yellowwwwwwww'],
    datasets: [
      {
        label: '# of Votes',
        data: [3, 5, 2],
      },
    ],
  },
]

module.exports = mockBarChartData
