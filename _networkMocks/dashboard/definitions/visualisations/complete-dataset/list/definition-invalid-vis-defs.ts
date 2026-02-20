import { invalidDefinition } from './vis-definitions/invalid'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'list-visualisations_complete-dataset',
  name: 'List - Invalid vis definition',
  description: 'Invalid vis definition',
  sections: [
    {
      id: 'section-1',
      display: 'Invalid vis definition',
      description: 'Invalid definition',
      visualisations: [invalidDefinition],
    },
  ],
  filterFields: [],
}
