const { matrix, lists } = require('../visualisations')
const { granularDateRangeFilter, dateRangeFilter } = require('../../../filter-definitions')

const dataQualityHistoric = {
  id: 'matrix-examples-diet-totals-historic',
  name: 'Matrix Examples - Diet totals - Historic',
  description: 'list examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Matrix example',
      description: '',
      visualisations: [matrix.findsTotalsOvertime],
    },
    {
      id: 'matrix-test-rag',
      display: 'Matrix RAG example',
      description: '',
      visualisations: [matrix.findsTotalsOvertimeRag],
    },
    {
      id: 'matrix-test-alldata',
      display: 'Matrix all data',
      description: '',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [dateRangeFilter],
}

module.exports = {
  dataQualityHistoric,
}
