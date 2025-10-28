const automaticBucketing = {
  id: 'automatic-bucketing',
  type: 'matrix-timeseries',
  display: 'Automatic bucketing example',
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

const automaticBucketingCustomBaseColour = {
  id: 'automatic-bucketing-custom-base-colour',
  type: 'matrix-timeseries',
  display: 'Custom base colour',
  description: 'Example with user defined custom base colour',
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

const automaticBucketingRag = {
  id: 'automatic-bucketing-rag-colours',
  type: 'matrix-timeseries',
  display: 'RAG colours',
  description: 'Example using RAG colours',
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

const automaticBucketingCustomColours = {
  id: 'automatic-bucketing-custom-bucket-colours',
  type: 'matrix-timeseries',
  display: 'Custom buckets colours',
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

const customBucketsWithSizing = {
  id: 'custom-bucket-sizing',
  type: 'matrix-timeseries',
  display: 'Custom bucket count and sizing',
  description: 'Example produces 5 buckets with boundaries in increments of 20',
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

const customBucketsWithSizingOpen = {
  id: 'custom-bucket-open-sizing',
  type: 'matrix-timeseries',
  display: 'Open ended bucket boundaries',
  description:
    'Demonstrates custom bucketing where the first bucket has not lower limit, and the last bucket has no higher limit',
  options: {
    buckets: [
      {
        max: 10,
      },
      {
        min: 11,
        max: 30,
      },
      {
        min: 31,
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

const customBucketsWithSizingAndColour = {
  id: 'custom-bucket-sizing-and-colour',
  type: 'matrix-timeseries',
  display: 'Custom bucket sizing, count and colour',
  description: '5 buckets. Increments of 20. 3 Custom colours',
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
  automaticBucketing,
  automaticBucketingRag,
  automaticBucketingCustomBaseColour,
  automaticBucketingCustomColours,
  customBucketsWithSizing,
  customBucketsWithSizingOpen,
  customBucketsWithSizingAndColour,
  findsTotalsOvertimeValidationError,
}
