import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations-monthly-complete-dataset',
  name: 'Line-timeseries - Monthly Complete dataset',
  description:
    'This dashboard represents example line-timeseries visualisations using a monthly complete dataset. The dashboard aims to demonstrate how charts will adapt to monthly data',
  sections: [
    {
      id: 'section-2',
      display: 'Line timeseries monthly charts',
      visualisations: [],
    },
    {
      id: 'totals-breakdown-monthly',
      display: 'Monthly Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
