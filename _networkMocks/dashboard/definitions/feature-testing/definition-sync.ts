import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import { components } from 'src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] & {
  loadType: components['schemas']['DashboardDefinitionSummary']['loadType']
} = {
  id: 'sync-dashboard',
  name: 'Sync Dashboard',
  description: 'Sync Dashboard used for testing',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Example bar charts',
      visualisations: [],
    },
    {
      id: 'section-2',
      display: 'Doughnut charts',
      description: 'Example doughnut charts',
      visualisations: [],
    },
    {
      id: 'section-3',
      display: 'Line charts',
      description: 'Example line charts',
      visualisations: [],
    },
    {
      id: 'section-4',
      display: 'Scorecards',
      description: 'Example score cards',
      visualisations: [],
    },
    {
      id: 'section-5',
      display: 'List charts',
      description: 'Example list visualisations',
      visualisations: [],
    },
    {
      id: 'section-x',
      display: 'Dataset',
      description: 'Underlying data set',
      visualisations: [],
    },
  ],
  loadType: 'sync' as components['schemas']['DashboardDefinitionSummary']['loadType'],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
