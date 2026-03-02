import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../complete-dataset/list/vis-definitions/full-data'
import * as LineChart from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-visualisations_partian-dataset',
  name: 'Line - Partial dataset',
  description:
    'This dashboard represents example Line visualisations using a partial dataset. The dashboard aims to show all the options available to display a Line using a partial dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Simple Line charts',
      description: 'Example line charts',
      visualisations: [
        LineChart.dietTotalsLine,
        LineChart.dietTotalsByEstablishmentLine,
        LineChart.dietTotalsByEstablishmentByWingLine,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
