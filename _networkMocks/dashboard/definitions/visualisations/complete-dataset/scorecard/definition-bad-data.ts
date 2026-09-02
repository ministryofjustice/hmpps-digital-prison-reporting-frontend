import { components } from '../../../../../../src/dpr/types/api'
import * as Scorecards from './vis-definitions/definitions'
import { fullDatasetHistoric } from '../list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-examples_complete-data',
  name: 'Scorecard - Complete data - missing or bad data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Full row of scorecards',
      description: 'Example showing a full row of scorecards',
      visualisations: [
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
    {
      id: 'section-2',
      display: 'Full row of scorecards - duplicates',
      description: 'Example showing a full row of scorecards',
      visualisations: [
        Scorecards.simpleScorecardMetricOneFilterOnEst,
        Scorecards.simpleScorecardMetricTwoFilter,
        Scorecards.simpleScorecardMetricThreeFilterOnEst,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}
