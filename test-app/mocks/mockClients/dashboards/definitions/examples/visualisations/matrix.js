const findsTotalsOvertime = {
  id: 'finds-totals--overtime',
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
    filters: [
      {
        id: 'finds',
        equals: 'Weapons',
      },
    ],
    expectNulls: true,
  },
}

const findsTotalsOvertimeRag = {
  id: 'finds-totals-overtime-rag',
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

const findsTotalsOvertimeValidationError = {
  id: 'finds-totals-overtime-rag',
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
        id: 'count',
        display: 'Total finds',
      },
      {
        id: 'ts',
        display: 'Date',
      },
    ],
    expectNulls: true,
  },
}

module.exports = {
  findsTotalsOvertime,
  findsTotalsOvertimeRag,
  findsTotalsOvertimeValidationError,
}
