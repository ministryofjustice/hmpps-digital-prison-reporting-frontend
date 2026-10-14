import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-yearly-complete-dataset',
  name: 'Line-timeseries - Yearly Complete dataset',
  description:
    'This dashboard represents example line-timeseries visualisations using a yearly complete dataset. The dashboard aims to demonstrate how charts will adapt to yearly data',
  sections: [
    {
      id: 'section-3',
      display: 'Line timeseries yearly charts',
      visualisations: [],
    },
    {
      id: 'totals-breakdown-yearly',
      display: 'Yearly Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
