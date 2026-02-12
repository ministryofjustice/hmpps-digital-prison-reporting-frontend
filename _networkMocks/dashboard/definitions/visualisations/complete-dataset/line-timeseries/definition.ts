import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations_complete-dataset',
  name: 'Line-timeseries - Complete dataset',
  description:
    'This dashboard represents example line-timeseries visualisations using a complete dataset. The dashboard aims to show all the options available to display a line-timeseries using a complete dataset.',
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
