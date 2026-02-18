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
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
    {
      id: 'section-2',
      display: 'Data quality scorecards with RAG colous',
      description: '',
      visualisations: [
        Scorecards.simpleScorecardRagColoursMetricTwo,
        Scorecards.simpleScorecardRagColoursMetricThree,
        Scorecards.simpleScorecardRagColoursMetricOne,
      ],
    },
    {
      id: 'section-3',
      display: 'Custom buckets colours',
      description: '',
      visualisations: [
        BucketScorecards.simpleScorecardCustomBucketsMetricTwo,
        BucketScorecards.simpleScorecardCustomBucketsMetricThree,
        BucketScorecards.simpleScorecardCustomBucketsMetricOne,
      ],
    },
  ],
  filterFields: [],
}
