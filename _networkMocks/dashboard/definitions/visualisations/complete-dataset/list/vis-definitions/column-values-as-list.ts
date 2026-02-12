import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const columnValuesAsList: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'list-vis-def_col-values-as-rows',
  type: DashboardVisualisationType.LIST,
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'No ethnicity',
      },
      {
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'No religion',
      },
      {
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'No nationality',
      },
    ],
    expectNulls: false,
  },
  options: { columnsAsList: true },
}
