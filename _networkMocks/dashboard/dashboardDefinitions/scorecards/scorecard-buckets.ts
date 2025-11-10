import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import { components } from '../../../../src/dpr/types/api'
import scorecard from '../../visualisations/scorecard'

export const scoreCardBucketTest: components['schemas']['DashboardDefinition'] = {
  id: 'test-scorecard-bucket-examples-data-quality',
  name: 'Docs Scorecard Examples - Data Quality',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Custom bucket boundaries',
      description: '',
      visualisations: [
        scorecard.simpleScorecardCustomBucketsBoundariesNationality,
        scorecard.simpleScorecardCustomBucketsBoundariesReligion,
        scorecard.simpleScorecardCustomBucketsBoundariesEthnicity,
      ],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
