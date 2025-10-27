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
      description: 'Range defined thresholds',
      visualisations: [matrix.findsTotalsOvertime, matrix.findsTotalsOvertimeCustomBaseColour],
    },
    {
      id: 'matrix-test-rag',
      display: 'Matrix RAG colour example',
      description: 'Range defined thresholds with RAG Colours',
      visualisations: [matrix.findsTotalsOvertimeRag],
    },
    {
      id: 'matrix-test-rag',
      display: 'Custom buckets example',
      description: 'User defined custom buckets',
      visualisations: [
        matrix.findsTotalsOvertimeCustomBuckets,
        matrix.findsTotalsOvertimeCustomBucketsWithSizing,
        matrix.findsTotalsOvertimeCustomBucketsWithSizingAndColour,
      ],
    },
    {
      id: 'matrix-test-alldata',
      display: 'Matrix all data',
      description: '',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [granularDateRangeFilter],
}

module.exports = {
  dataQualityHistoric,
}
