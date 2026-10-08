import { components } from '../../../../../../src/dpr/types/api'
import * as Matrix from './vis-definitions/definitions-invalid'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'matrix-examples_invalid',
  name: 'Matrix Examples - Invalid Data',
  description: 'Invalid Matrix Examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Matrix invalid',
      description: '',
      visualisations: [Matrix.matrixNoKey, Matrix.matrixOnlyOneMeasure],
    },
  ],
  filterFields: [],
}
