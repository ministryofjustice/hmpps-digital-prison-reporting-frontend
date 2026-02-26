import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../complete-dataset/list/vis-definitions/full-data'
import * as BarCharts from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'bar-visualisations_partial-dataset',
  name: 'Bar - Partial dataset',
  description:
    'This dashboard represents example bar visualisations using a partial dataset. The dashboard aims to show all the options available to display a bar using a partial dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1 title',
      description: 'Section 1 description',
      visualisations: [
        BarCharts.dietTotalsBar,
        // BarCharts.dietTotalsByEstablishmentBar,
        // BarCharts.dietTotalsByEstablishmentByWingBar,
        // BarCharts.dietTotalsByEstablishmentByWingByCellBar,
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
