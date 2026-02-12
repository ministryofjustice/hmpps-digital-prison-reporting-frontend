import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const mockEthnicityLineChartTimeseries: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing ethnicity timeseries chart',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
      },
    ],
    expectNulls: false,
  },
}
