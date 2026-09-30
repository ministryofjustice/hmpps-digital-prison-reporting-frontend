import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const automaticBucketing = {
  id: 'automatic-bucketing',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Automatic bucketing example',
  description: '',
  options: { showLatest: false },
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
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const automaticBucketingCustomBaseColour = {
  id: 'automatic-bucketing-custom-base-colour',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
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
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const automaticBucketingRag = {
  id: 'automatic-bucketing-rag-colours',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'RAG colours',
  description: 'Example using RAG colours',
  options: {
    useRagColour: true,
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
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const automaticBucketingCustomColours = {
  id: 'automatic-bucketing-custom-bucket-colours',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
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
        type: 'timestamp',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const customBucketsWithSizing = {
  id: 'custom-bucket-sizing',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
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
        type: 'timestamp',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
    ],
    expectNulls: false,
  },
}

export const customBucketsWithSizingOpen = {
  id: 'custom-bucket-open-sizing',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
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
        type: 'timestamp',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const customBucketsWithSizingAndColour = {
  id: 'custom-bucket-sizing-and-colour',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Custom bucket sizing, count and colour',
  description: '5 buckets. Increments of 20. 3 Custom colours',
  options: {
    buckets: [
      // TODO: fix these buckets sizings to colour is not black
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
        type: 'timestamp',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}
