import { components } from 'src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const automaticBucketing: components['schemas']['DashboardVisualisationDefinition'] = {
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

export const automaticBucketingCustomBaseColour: components['schemas']['DashboardVisualisationDefinition'] = {
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

export const automaticBucketingRag: components['schemas']['DashboardVisualisationDefinition'] = {
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

export const automaticBucketingCustomColours: components['schemas']['DashboardVisualisationDefinition'] = {
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

export const customBucketsWithSizing: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'custom-bucket-sizing',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Custom bucket count and sizing',
  description: 'Example produces 4 buckets with custom boundaries',
  options: {
    buckets: [
      {
        min: 0,
        max: 450,
      },
      {
        min: 451,
        max: 500,
      },
      {
        min: 501,
        max: 600,
      },
      {
        min: 601,
        max: 800,
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

export const customBucketsWithSizingOpen: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'custom-bucket-open-sizing',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Open ended bucket boundaries',
  description:
    'Demonstrates custom bucketing where the first bucket has not lower limit, and the last bucket has no higher limit',
  options: {
    buckets: [
      {
        min: 0,
        max: 450,
      },
      {
        min: 451,
        max: 500,
      },
      {
        min: 501,
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

export const customBucketsWithSizingAndColour: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'custom-bucket-sizing-and-colour',
  type: DashboardVisualisationType.MATRIX_TIMESERIES,
  display: 'Custom bucket sizing, count and colour',
  description: '3 buckets. 3 Custom colours',
  options: {
    buckets: [
      {
        min: 0,
        max: 500,
        hexColour: '#912b88',
      },
      {
        min: 501,
        max: 600,
        hexColour: '#f47738',
      },
      {
        min: 601,
        max: 800,
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
