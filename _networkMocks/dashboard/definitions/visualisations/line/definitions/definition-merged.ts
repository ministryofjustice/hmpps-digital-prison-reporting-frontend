import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as LineChart from '../vis-definitions/definitions-merged'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-visualisations_partian-dataset',
  name: 'Line - Merged dataset',
  description:
    'This dashboard represents example Line visualisations using a merged dataset. The dashboard aims to show all the options available to display a Line using a merged dataset.',
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
