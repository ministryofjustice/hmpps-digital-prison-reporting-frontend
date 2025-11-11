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
        scorecard.simpleScorecardNationality,
        scorecard.simpleScorecardEthnicity,
        scorecard.simpleScorecardNationality,
        lists.dataQualityEthnicity,
        scorecard.simpleScorecardReligion,
        scorecard.simpleScorecardNationality,
      ],
    },
    {
      id: 'section-2',
      display: 'Data quality scorecards with RAG colous',
      description: '',
      visualisations: [
        scorecard.simpleScorecardRagColoursNationality,
        scorecard.simpleScorecardRagColoursReligion,
        scorecard.simpleScorecardRagColoursEthnicity,
      ],
    },
    {
      id: 'section-3',
      display: 'Custom buckets colours',
      description: '',
      visualisations: [
        scorecard.simpleScorecardCustomBucketsNationality,
        scorecard.simpleScorecardCustomBucketsReligion,
        scorecard.simpleScorecardCustomBucketsEthnicity,
      ],
    },
    {
      id: 'section-4',
      display: 'Custom bucket boundaries',
      description: '',
      visualisations: [
        scorecard.simpleScorecardCustomBucketsBoundariesNationality,
        scorecard.simpleScorecardCustomBucketsBoundariesReligion,
        scorecard.simpleScorecardCustomBucketsBoundariesEthnicity,
      ],
    },
    {
      id: 'section-4',
      display: 'Filters',
      description: '',
      visualisations: [scorecard.simpleScorecardNationalityFilter],
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
