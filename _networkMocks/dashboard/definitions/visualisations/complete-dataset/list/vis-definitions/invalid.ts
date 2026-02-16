import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const invalidDefinition: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-data-quality-has-ethnicity',
  type: DashboardVisualisationType.LIST,
  display: 'Invalid Definition',
  description: 'Invalid List visualisation',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [], // <-- must contain a single measure
    expectNulls: false,
  },
}
