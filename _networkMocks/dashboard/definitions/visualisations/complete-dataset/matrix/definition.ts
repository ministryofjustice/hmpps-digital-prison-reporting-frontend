import { components } from 'src/dpr/types/api'
import { fullDatasetHistoric } from '../list/vis-definitions/full-data'
import * as matrix from './vis-definitions/definitions'

const basicDefinition: components['schemas']['DashboardDefinition'] = {
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

export const dailyDefinition: components['schemas']['DashboardDefinition'] = {
  ...basicDefinition,
  id: 'matrix-examples_complete-data_daily',
}

export const monthlyDefinition: components['schemas']['DashboardDefinition'] = {
  ...basicDefinition,
  id: 'matrix-examples_complete-data_monthly',
  name: 'Matrix - Complete data monthly',
  sections: basicDefinition.sections.map(section => ({ ...section, id: `${section.id}-monthly` })),
}

export const annuallyDefinition: components['schemas']['DashboardDefinition'] = {
  ...basicDefinition,
  id: 'matrix-examples_complete-data_annually',
  name: 'Matrix - Complete data annually',
  sections: basicDefinition.sections.map(section => ({ ...section, id: `${section.id}-annually` })),
}

export const definition: components['schemas']['DashboardDefinition'] = {
  ...dailyDefinition,
  childVariants: [monthlyDefinition, annuallyDefinition],
}
