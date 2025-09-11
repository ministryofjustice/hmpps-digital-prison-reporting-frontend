import { establishmentIdFilter } from '@networkMocks/dashboard/filter-definitions'
import lists from '../visualisations/lists'

export const dataQualityFlexible = {
  id: 'list-examples-data-quality-flexible',
  name: 'List Examples - Data Quality - Flexible',
  description: 'list examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data Quality lists',
      description: '',
      visualisations: [lists.dataQualityEthnicity, lists.dataQualityReligion, lists.dataQualityNationality],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}

