import { components } from '../../../../../../src/dpr/types/api'
import * as Scorecards from './vis-definitions/definitions-invalid'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-examples_complete-data',
  name: 'Scorecard - Invalid visualisation definitions',
  description: 'Scorecard examples that are invalid',
  sections: [
    {
      id: 'section-1',
      display: 'Single scorecard',
      description: 'Example showing a single scorecard',
      visualisations: [
        Scorecards.simpleScorecardMetricOneInvalid,
        Scorecards.simpleScorecardMetricTwoInvalid,
        Scorecards.simpleScorecardMetricThreeInvalid,
      ],
    },
  ],
  filterFields: [],
}
