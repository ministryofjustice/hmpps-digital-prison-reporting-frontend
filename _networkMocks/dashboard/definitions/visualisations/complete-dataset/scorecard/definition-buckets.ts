import { components } from '../../../../../../src/dpr/types/api'
import * as Scorecards from './vis-definitions/definitions-buckets'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-example_bucket_complete-data',
  name: 'Scorecard - Buckets - Complete data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Custom bucket boundaries',
      description: '',
      visualisations: [
        Scorecards.simpleScorecardCustomBucketsBoundariesNationality,
        Scorecards.simpleScorecardCustomBucketsBoundariesReligion,
        Scorecards.simpleScorecardCustomBucketsBoundariesEthnicity,
      ],
    },
  ],
  filterFields: [],
}
