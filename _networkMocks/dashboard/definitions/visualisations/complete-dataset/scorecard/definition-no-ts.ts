import { components } from '../../../../../../src/dpr/types/api'
import { definition as completeDataDefinition } from './definition'

export const definition: components['schemas']['DashboardDefinition'] = {
  ...completeDataDefinition,
  id: 'scorecard-examples_complete-data-no-ts',
  name: 'Scorecard - No TS Complete data',
}
