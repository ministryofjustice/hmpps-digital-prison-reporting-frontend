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

const findsTotalsOvertimeCustomBaseColour = {
  id: 'finds-totals--overtime',
  type: 'matrix-timeseries',
  display: 'Finds totals over time matrix chart',
  description: '',
  options: {
    baseColour: '#912b88',
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

const findsTotalsOvertimeCustomBuckets = {
  id: 'finds-totals-overtime-rag-custom-buckets',
  type: 'matrix-timeseries',
  display: 'Finds totals over time',
  description: '',
  options: {
    buckets: [
      {
        hexColour: '#912b88',
      },
      {
        hexColour: '#f47738',
      },
      {
        hexColour: '#28a197',
      },
    ],
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

const findsTotalsOvertimeCustomBucketsWithSizing = {
  id: 'finds-totals-overtime-rag-custom-buckets-with-sizing',
  type: 'matrix-timeseries',
  display: 'Finds totals over time',
  description: '',
  options: {
    buckets: [
      {
        min: 0,
        max: 20,
      },
      {
        min: 21,
        max: 40,
      },
      {
        min: 41,
        max: 60,
      },
      {
        min: 61,
        max: 80,
      },
      {
        min: 81,
        max: 100,
      },
    ],
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

const findsTotalsOvertimeCustomBucketsWithSizingAndColour = {
  id: 'finds-totals-overtime-rag-sizing-and-colour',
  type: 'matrix-timeseries',
  display: 'Finds totals over time',
  description: '',
  options: {
    buckets: [
      {
        min: 0,
        max: 20,
        hexColour: '#912b88',
      },
      {
        min: 21,
        max: 40,
      },
      {
        min: 41,
        max: 60,
        hexColour: '#f47738',
      },
      {
        min: 61,
        max: 80,
      },
      {
        min: 81,
        max: 100,
        hexColour: '#28a197',
      },
    ],
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
  findsTotalsOvertimeCustomBuckets,
  findsTotalsOvertimeCustomBucketsWithSizing,
  findsTotalsOvertimeCustomBucketsWithSizingAndColour,
  findsTotalsOvertimeCustomBaseColour,
  findsTotalsOvertimeValidationError,
}
