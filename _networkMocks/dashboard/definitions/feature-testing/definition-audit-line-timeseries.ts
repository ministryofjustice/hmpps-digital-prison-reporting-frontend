import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const lineTimeseriesChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'lineTimeseries-chart-audit-0',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: '',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
      {
        id: '',
        display: '',
      },
    ],
    expectNulls: false,
  },
}

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-line-timeseries',
  name: 'Line Timeseries chart - Audit testing',
  description: 'Test Dashboard used for audit testing of Line Timeseries charts',
  sections: [
    {
      id: 'section-0',
      display: '',
      description: '',
      visualisations: [lineTimeseriesChartAudit0],
    },
  ],
  filterFields: [],
}
