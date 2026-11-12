import { components } from 'src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing',
  name: 'Dashboard Audit testing',
  description: 'Test Dashboard used for testing',
  sections: [
    {
      id: 'section-1',
      display: '',
      description: '',
      visualisations: [],
    },
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Bar charts that need work',
      visualisations: [],
    },
    {
      id: 'section-3',
      display: 'Doughnut charts',
      description: 'Doughnut charts that need work',
      visualisations: [],
    },
    {
      id: 'section-4',
      display: 'Line charts',
      description: 'Line charts that need work',
      visualisations: [],
    },
  ],
  filterFields: [],
}
