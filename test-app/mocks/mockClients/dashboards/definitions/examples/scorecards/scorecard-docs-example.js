// @ts-nocheck
const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, scorecard } = require('../visualisations')

const docsScoreCard = {
  id: 'docs-scorecard-examples-data-quality',
  name: 'Docs Scorecard Examples - Data Quality',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data quality scorecards',
      description: '',
      visualisations: [
        scorecard.simpleScorecardMetricTwo,
        scorecard.simpleScorecardReligion,
        scorecard.simpleScorecardMetricOne,
      ],
    },
    {
      id: 'section-2',
      display: 'RAG colours',
      description: 'Example scorecards that use RAG colours',
      visualisations: [
        scorecard.simpleScorecardRagColoursMetricTwo,
        scorecard.simpleScorecardRagColoursReligion,
        scorecard.simpleScorecardRagColoursMetricOne,
      ],
    },
    {
      id: 'section-3',
      display: 'Custom buckets colours',
      description: 'Example scorecards that use custom bucket colours',
      visualisations: [
        scorecard.simpleScorecardCustomBucketsMetricTwo,
        scorecard.simpleScorecardCustomBucketsReligion,
        scorecard.simpleScorecardCustomBucketsMetricOne,
      ],
    },
    {
      id: 'section-4',
      display: 'Custom bucket boundaries',
      description: 'Example scorecards that use custom bucket bucket boundaries ',
      visualisations: [
        scorecard.simpleScorecardCustomBucketsBoundariesMetricTwo,
        scorecard.simpleScorecardCustomBucketsBoundariesReligion,
        scorecard.simpleScorecardCustomBucketsBoundariesMetricOne,
      ],
    },
    {
      id: 'section-4',
      display: 'Filters',
      description: 'Scorecard showing MetricTwo metrics for Est ID: SLI',
      visualisations: [scorecard.simpleScorecardMetricTwoFilter],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  docsScoreCard,
}
