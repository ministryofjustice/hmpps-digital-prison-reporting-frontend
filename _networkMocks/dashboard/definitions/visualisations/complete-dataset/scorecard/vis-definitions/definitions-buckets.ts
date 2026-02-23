import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const simpleScorecardCustomBucketsMetricTwo: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricTwo',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
    expectNulls: false,
  },
}

export const simpleScorecardCustomBucketsMetricOne: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricOne',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
    expectNulls: false,
  },
}

export const simpleScorecardCustomBucketsMetricThree: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-buckets',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricThree',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
    expectNulls: false,
  },
}

export const simpleScorecardCustomBucketsBoundariesMetricThree: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'simple-scorecard-rag-metric-three-buckets',
    type: DashboardVisualisationType.SCORECARD,
    display: 'No of prisoners with MetricThree',
    options: {
      useRagColour: true,
      buckets: [{ max: 500 }, { min: 501, max: 600 }, { min: 601 }],
    },
    columns: {
      keys: [{ id: 'establishment_id' }],
      measures: [{ id: 'has_metric_three' }],
      expectNulls: false,
    },
  }

export const simpleScorecardCustomBucketsBoundariesMetricTwo: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'simple-scorecard-rag-metric-two-buckets',
    type: DashboardVisualisationType.SCORECARD,
    display: 'No of prisoners with MetricTwo',
    options: {
      useRagColour: true,
      buckets: [{ max: 300 }, { min: 301, max: 800 }, { min: 801 }],
    },
    columns: {
      keys: [{ id: 'establishment_id' }],
      measures: [{ id: 'has_metric_two' }],
      expectNulls: false,
    },
  }

export const simpleScorecardCustomBucketsBoundariesMetricOne: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'simple-scorecard-rag-metric-one-buckets',
    type: DashboardVisualisationType.SCORECARD,
    display: 'No of prisoners with MetricOne',
    options: {
      useRagColour: true,
      buckets: [{ max: 200 }, { min: 201, max: 700 }, { min: 701 }],
    },
    columns: {
      keys: [{ id: 'establishment_id' }],
      measures: [{ id: 'has_metric_one' }],
      expectNulls: false,
    },
  }
