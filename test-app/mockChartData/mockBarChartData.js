const mockBarChartData = [
  {
    id: 'chart-1',
    type: 'bar',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 10],
      },
    ],
    axis: 'x',
  },
  {
    id: 'chart-2',
    type: 'bar',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 10],
      },
      {
        label: '# of other Votes',
        data: [17, 10, 6, 9, 6, 8],
      },
    ],
    axis: 'x',
  },
  {
    id: 'chart-3',
    type: 'bar',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 10],
      },
      {
        label: '# of other Votes',
        data: [17, 10, 6, 9, 6, 8],
      },
    ],
    axis: 'x',
    stacked: true,
  },
  {
    id: 'chart-4',
    type: 'bar',
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 10],
      },
      {
        label: '# of other Votes',
        data: [17, 10, 6, 9, 6, 8],
      },
      {
        label: '# of other Votes',
        data: [17, 10, 6, 9, 6, 8],
      },
    ],
    axis: 'x',
  },
]

module.exports = mockBarChartData
