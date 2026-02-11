import { granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'

import * as Matrix from './vis-definitions/definitions'

export const definition = {
  id: 'matrix-examples_complete-data_historic',
  name: 'Matrix Examples - Complete data - Historic',
  description: 'list examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Matrix example',
      description: '',
      visualisations: [Matrix.dietTotalsVegetarianOvertime],
    },
  ],
  filterFields: [granularDateRangeFilter],
}
