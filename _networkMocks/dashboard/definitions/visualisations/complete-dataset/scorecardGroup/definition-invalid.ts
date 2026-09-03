import * as Scorecards from './vis-definitions/definitions-invalid'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'scorecard-group-example_complete-data-invalid',
  name: 'Scorecard Group - Complete data - invalid',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data quality scorecards',
      description: '',
      visualisations: [Scorecards.scorecardGroupInvalidDef1, Scorecards.scorecardGroupInvalidDef2],
    },
  ],
  filterFields: [],
}
