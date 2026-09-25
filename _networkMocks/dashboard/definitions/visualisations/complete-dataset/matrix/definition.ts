import { fullDatasetHistoric } from '../list/vis-definitions/full-data'
import * as matrix from './vis-definitions/definitions'

export const definition = {
  id: 'matrix-examples_complete-data_historic',
  name: 'Matrix - Complete data - Historic',
  description: 'Matrix examples',
  sections: [
    {
      id: 'matrix-test',
      display: 'Automatic bucketing',
      description:
        'Examples of heatmaps charts where buckets are defined automatically using the values in the data, to produce 3 buckets of equal size',
      visualisations: [
        matrix.automaticBucketing,
        // matrix.automaticBucketingCustomBaseColour,
        // matrix.automaticBucketingRag,
        // matrix.automaticBucketingCustomColours,
      ],
    },
    {
      id: 'matrix-test-rag',
      display: 'User defined custom buckets',
      description:
        'Examples of heatmaps where the bucket count, sizing and colourings are defined in the visualisation definition',
      visualisations: [
        matrix.customBucketsWithSizing,
        // matrix.customBucketsWithSizingOpen,
        // matrix.customBucketsWithSizingAndColour,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}

// export const definition = {
//   id: 'matrix-examples_complete-data_historic',
//   name: 'Matrix - Complete data - Historic',
//   description: 'Matrix examples',
//   sections: [
//     {
//       id: 'matrix-test',
//       display: 'Matrix example',
//       description: '',
//       visualisations: [Matrix.dataQualityHasMetricTwoOvertime],
//     },
//     {
//       id: 'totals-breakdown',
//       display: 'Full Dataset',
//       visualisations: [fullDatasetHistoric],
//     },
//   ],
//   filterFields: [],
// }
