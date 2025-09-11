import { establishmentIdFilter, wingFilterCompass, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import lists from '../visualisations/lists'

export const dietTotalsFullDataset = {
  id: 'list-examples-diet-totals-full-set',
  name: 'Diet totals data set',
  description: 'Diet total full dataset',
  sections: [
    {
      id: 'full-set',
      display: 'Full data set',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass, granularDateRangeFilter],
}
