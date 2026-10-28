import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as BarChart from '../../bar/vis-definitions/definitions-merged'
import * as ListChart from '../../list/vis-definitions/column-values-as-list-merged'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'mixed-visualisations_merged-dataset',
  name: 'Mixed - Merged dataset',
  description:
    'This dashboard represents example mixed visualisations using a merged dataset. The dashboard aims to show all the options available to display a mixed using a merged dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Example bar charts',
      visualisations: [
        BarChart.dietTotalsBar,
        BarChart.dietTotalsByEstablishmentBar,
        BarChart.dietTotalsByEstablishmentByWingBar,
      ],
    },
    {
      id: 'section-2',
      display: 'List charts',
      description: 'Example List charts',
      visualisations: [
        ListChart.dietTotalsByEstablishmentByWing,
        ListChart.dietTotalsByEstablishmentByWingByCellFilters,
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
