import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../complete-dataset/list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-visualisations_partial-dataset',
  name: 'Line - Partial dataset',
  description:
    'This dashboard represents example line visualisations using a partial dataset. The dashboard aims to show all the options available to display a line using a partial dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1 title',
      description: 'Section 1 description',
      visualisations: [],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
