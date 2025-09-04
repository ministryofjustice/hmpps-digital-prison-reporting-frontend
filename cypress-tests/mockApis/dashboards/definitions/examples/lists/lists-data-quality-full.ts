import { establishmentIdFilter } from '../../../filter-definitions'
import lists from '../visualisations/lists'

export const dataQualityFullDataset = {
  id: 'list-examples-data-quality-dataset',
  name: 'Data quality data set',
  description: 'Data quality full dataset',
  sections: [
    {
      id: 'totals-breakdown',
      display: 'Full data set',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}
