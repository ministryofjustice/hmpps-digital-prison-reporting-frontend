import { components } from '../../../../../../src/dpr/types/api'
import * as Scorecards from './vis-definitions/definitions'
import * as BucketScorecards from './vis-definitions/definitions-buckets'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-examples_complete-data',
  name: 'Scorecard - Complete data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data quality scorecards',
      description: '',
      visualisations: [
        Scorecards.simpleScorecardNationality,
        Scorecards.simpleScorecardEthnicity,
        Scorecards.simpleScorecardReligion,
      ],
    },
    {
      id: 'section-2',
      display: 'Data quality scorecards with RAG colous',
      description: '',
      visualisations: [
        Scorecards.simpleScorecardRagColoursNationality,
        Scorecards.simpleScorecardRagColoursReligion,
        Scorecards.simpleScorecardRagColoursEthnicity,
      ],
    },
    {
      id: 'section-3',
      display: 'Custom buckets colours',
      description: '',
      visualisations: [
        BucketScorecards.simpleScorecardCustomBucketsNationality,
        BucketScorecards.simpleScorecardCustomBucketsReligion,
        BucketScorecards.simpleScorecardCustomBucketsEthnicity,
      ],
    },
  ],
  filterFields: [],
}
