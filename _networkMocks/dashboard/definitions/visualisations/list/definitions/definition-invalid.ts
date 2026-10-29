import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'invalid-definition-missing-sections',
  name: 'Invalid definition',
  description: 'Missing sections array',
  filterFields: [],
} as unknown as components['schemas']['DashboardDefinition']
