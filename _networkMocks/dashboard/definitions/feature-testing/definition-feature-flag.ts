import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import { components } from 'src/dpr/types/api'
import * as BarCharts from '../visualisations/complete-dataset/bar/vis-definitions/cols-as-labels'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard',
  description: 'Dashboard used for testing testing',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Example bar charts',
      visualisations: [BarCharts.dataQualityMetricOneBar],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
