const mockBarChartReligion = {
  id: 'religion-bar',
  type: 'bar',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'religion_description',
        display: 'Religion Description',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'No of prisoners',
        axis: 'y',
      },
    ],
  },
}

const mockPieChartReligion = {
  id: 'religion-doughhut',
  type: 'doughnut',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'religion_description',
        display: 'Religion Description',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'No of prisoners',
        axis: 'y',
      },
    ],
    ignoreRemainingColumns: true,
  },
}

module.exports = {
  mockBarChartReligion,
  mockPieChartReligion,
}
