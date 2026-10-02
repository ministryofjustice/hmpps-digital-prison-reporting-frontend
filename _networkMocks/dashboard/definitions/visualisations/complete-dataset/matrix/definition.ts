import { fullDatasetHistoric } from '../list/vis-definitions/full-data'
import * as matrix from './vis-definitions/definitions'

const basicDefinition = {
  id: 'matrix-examples_complete-data',
  name: 'Matrix - Complete data',
  description: 'Matrix examples',
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
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}

export const dailyDefinition = {
  ...basicDefinition,
  id: 'matrix-examples_complete-data_daily',
}

export const monthlyDefinition = {
  ...basicDefinition,
  id: 'matrix-examples_complete-data_monthly',
  name: 'Matrix - Complete data monthly',
  sections: basicDefinition.sections.map(section => ({ ...section, id: `${section.id}-monthly` })),
}

export const annuallyDefinition = {
  ...basicDefinition,
  id: 'matrix-examples_complete-data_annually',
  name: 'Matrix - Complete data annually',
  sections: basicDefinition.sections.map(section => ({ ...section, id: `${section.id}-annually` })),
}

export const definition = {
  ...dailyDefinition,
  childVariants: [monthlyDefinition, annuallyDefinition],
}

export const partialDefinition = {
  ...definition,
  sections: definition.sections.map(section => ({
    ...section,
    visualisations: section.visualisations.map(vis => ({ ...vis, expectNulls: true })),
  })),
}
