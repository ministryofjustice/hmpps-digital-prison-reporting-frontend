const { matrix, lists } = require('../visualisations')
const { granularDateRangeFilter, dateRangeFilter } = require('../../../filter-definitions')

const dataQualityHistoric = {
  id: 'matrix-examples-diet-totals-historic',
  name: 'Matrix Chart Examples - Finds totals - Historic',
  description: 'Heatmap examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Automatic bucketing',
      description:
        'Examples of heatmaps charts where buckets are defined automatically using the values in the data, to produce 3 buckets of equal size',
      visualisations: [
        matrix.automaticBucketing,
        matrix.automaticBucketingCustomBaseColour,
        matrix.automaticBucketingRag,
        matrix.automaticBucketingCustomColours,
      ],
    },
    {
      id: 'matrix-test-rag',
      display: 'User defined custom buckets',
      description:
        'Examples of heatmaps where the bucket count, sizing and colourings are defined in the visualisation definition',
      visualisations: [
        matrix.customBucketsWithSizing,
        matrix.customBucketsWithSizingOpen,
        matrix.customBucketsWithSizingAndColour,
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
