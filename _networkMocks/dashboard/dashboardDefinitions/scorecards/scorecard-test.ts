import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import { components } from '../../../../src/dpr/types/api'
import scorecard from '../../visualisations/scorecard'

export const docsScoreCard: components['schemas']['DashboardDefinition'] = {
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
        scorecard.simpleScorecardReligion,
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
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
