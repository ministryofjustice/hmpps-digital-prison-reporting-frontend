const { matrix, lists } = require('../visualisations')
const { granularDateRangeFilter } = require('../../../filter-definitions')

const dataQualityHistoric = {
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

module.exports = {
  dataQualityHistoric,
}
