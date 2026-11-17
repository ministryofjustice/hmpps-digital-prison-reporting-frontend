import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const doughnutChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-chart-audit-0',
  type: DashboardVisualisationType.DONUT,
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
  id: 'dashboard-audit-testing-doughnut',
  name: 'Doughnut chart - Audit testing',
  description: 'Test Dashboard used for audit testing of Doughnut charts',
  sections: [
    {
      id: 'section-0',
      display: '',
      description: '',
      visualisations: [doughnutChartAudit0],
    },
  ],
  filterFields: [],
}
