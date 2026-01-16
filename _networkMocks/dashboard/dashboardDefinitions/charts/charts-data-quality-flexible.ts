import { establishmentIdFilter } from '@networkMocks/dashboard/filter-definitions'
import { components } from 'dpr/types/api'
import lists from '../visualisations/lists'

export const dataQualityFlexible = {
  id: 'chart-examples-data-quality-flexible',
  name: 'Chart Examples - Flexible Data Quality',
  description: 'chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data Quality bar charts',
      description: '',
      visualisations: <components['schemas']['DashboardVisualisationDefinition'][]>[],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}
