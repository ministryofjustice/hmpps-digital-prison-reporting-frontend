import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const lineChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-chart-audit-0',
  type: DashboardVisualisationType.LINE,
  display: '',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: '',
        display: '',
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
  id: 'dashboard-audit-testing-line',
  name: 'line chart - Audit testing',
  description: 'Test Dashboard used for audit testing of Line charts',
  sections: [
    {
      id: 'section-0',
      display: '',
      description: '',
      visualisations: [lineChartAudit0],
    },
  ],
  filterFields: [],
}
