import { granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'
import { components } from '../../../../../../src/dpr/types/api'
import * as Matrix from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
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
