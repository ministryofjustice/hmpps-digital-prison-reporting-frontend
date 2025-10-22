const findsTotalsVegetarianOvertime = {
  id: 'finds-totals-vegetarian-overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  options: {},
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
    ],
    expectNulls: true,
  },
}

const findsTotalsVegetarianOvertimeRag = {
  id: 'finds-totals-vegetarian-overtime-rag',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart RAG',
  description: '',
  options: {
    useRagColours: true,
  },
  columns: {
    keys: [
      {
        id: 'ts',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total finds',
      },
    ],
    expectNulls: true,
  },
}

module.exports = {
  findsTotalsVegetarianOvertime,
  findsTotalsVegetarianOvertimeRag,
}
