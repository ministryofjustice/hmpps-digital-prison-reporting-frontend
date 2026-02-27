import { components } from '../../../../../../src/dpr/types/api'
import * as Scorecards from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-examples_complete-data',
  name: 'Scorecard - Complete data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Single scorecard',
      description: 'Example showing a single scorecard',
      visualisations: [Scorecards.simpleScorecardMetricTwo],
    },
    {
      id: 'section-2',
      display: 'Double scorecard',
      description: 'Example showing a two adjacent scorecards',
      visualisations: [Scorecards.simpleScorecardMetricTwo, Scorecards.simpleScorecardMetricOne],
    },
    {
      id: 'section-3',
      display: 'Full row of scorecards',
      description: 'Example showing a full row of scorecards',
      visualisations: [
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
    {
      id: 'section-4',
      display: 'Double row',
      description: 'Example showing a two rows of scorecards',
      visualisations: [
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricOne,
        Scorecards.simpleScorecardMetricThree,
        Scorecards.simpleScorecardMetricTwo,
        Scorecards.simpleScorecardMetricThree,
      ],
    },
  ],
  filterFields: [],
}
