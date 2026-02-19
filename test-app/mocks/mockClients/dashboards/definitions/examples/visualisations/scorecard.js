// @ts-nocheck
const simpleScorecardMetricTwo = {
  id: 'simple-scorecard-MetricTwo',
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
  },
}

const simpleScorecardMetricTwoFilter = {
  id: 'simple-scorecard-MetricTwo',
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
    filters: [
      {
        id: 'establishment_id',
        equals: 'GHI',
      },
    ],
  },
}

const simpleScorecardMetricThree = {
  id: 'simple-scorecard-MetricThree',
  type: 'scorecard',
  display: 'No of prisoners with MetricThree',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
  },
}

const simpleScorecardMetricOne = {
  id: 'simple-scorecard-MetricOne',
  type: 'scorecard',
  display: 'No of prisoners with MetricOne',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
  },
}

const simpleScorecardRagColoursMetricTwo = {
  id: 'simple-scorecard-rag-MetricTwo',
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
  },
}

const simpleScorecardRagColoursMetricThree = {
  id: 'simple-scorecard-rag-MetricThree',
  type: 'scorecard',
  display: 'No of prisoners with MetricThree',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
  },
}

const simpleScorecardRagColoursMetricOne = {
  id: 'simple-scorecard-rag-MetricOne',
  type: 'scorecard',
  display: 'No of prisoners with MetricOne',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
  },
}

const simpleScorecardCustomBucketsMetricTwo = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
  },
}

const simpleScorecardCustomBucketsMetricOne = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with MetricOne',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
  },
}

const simpleScorecardCustomBucketsMetricThree = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with MetricThree',
  options: {
    buckets: [{ hexColour: '#912b88' }, { hexColour: '#28a197' }, { hexColour: '#f47738' }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
  },
}

const simpleScorecardCustomBucketsBoundariesMetricThree = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with MetricThree',
  options: {
    useRagColour: true,
    buckets: [{ max: 40 }, { min: 41, max: 60 }, { min: 61 }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
  },
}

const simpleScorecardCustomBucketsBoundariesMetricTwo = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with MetricTwo',
  options: {
    useRagColour: true,
    buckets: [{ max: 50 }, { min: 51, max: 55 }, { min: 56 }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
  },
}

const simpleScorecardCustomBucketsBoundariesMetricOne = {
  id: 'simple-scorecard-rag',
  type: 'scorecard',
  display: 'No of prisoners with MetricOne',
  options: {
    useRagColour: true,
    buckets: [{ max: 20 }, { min: 21, max: 70 }, { min: 71 }],
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
  },
}

const dietTotalFilterEstWing = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard',
  columns: {
    keys: [{ id: 'establishment_id' }, { id: 'wing' }],
    measures: [{ id: 'count' }],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
      {
        id: 'wing',
        equals: 'north',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalFilter = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard',
  display: 'Total DietOnes',
  columns: {
    keys: [],
    measures: [{ id: 'count' }],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

const dataQuality = {
  simpleScorecardMetricTwo,
  simpleScorecardMetricThree,
  simpleScorecardMetricOne,
  simpleScorecardRagColoursMetricTwo,
  simpleScorecardRagColoursMetricThree,
  simpleScorecardRagColoursMetricOne,
  simpleScorecardCustomBucketsMetricTwo,
  simpleScorecardCustomBucketsMetricOne,
  simpleScorecardCustomBucketsMetricThree,
  simpleScorecardCustomBucketsBoundariesMetricTwo,
  simpleScorecardCustomBucketsBoundariesMetricOne,
  simpleScorecardCustomBucketsBoundariesMetricThree,
  simpleScorecardMetricTwoFilter,
}

const dietMetrics = {
  dietTotalFilter,
  dietTotalFilterEstWing,
}

const scorecard = {
  ...dataQuality,
  ...dietMetrics,
}

module.exports = scorecard
