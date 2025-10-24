import { granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'

import lists from '../visualisations/lists'
import matrix from '../visualisations/matrix'

export const dataQualityHistoric = {
  id: 'matrix-examples-diet-totals-historic',
  name: 'Matrix Examples - Diet totals - Historic',
  description: 'list examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Matrix example',
      description: '',
      visualisations: [matrix.dietTotalsVegetarianOvertime, lists.fullDatasetOverTime],
    },
  ],
  filterFields: [granularDateRangeFilter],
}
