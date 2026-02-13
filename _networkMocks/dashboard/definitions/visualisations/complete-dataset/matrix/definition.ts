import * as Matrix from './vis-definitions/definitions'

export const definition = {
  id: 'matrix-examples_complete-data_historic',
  name: 'Matrix Examples - Complete data - Historic',
  description: 'Matrix examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Matrix example',
      description: '',
      visualisations: [Matrix.dataQualityHasNationalityOvertime],
    },
  ],
  filterFields: [],
}
