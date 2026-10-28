import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as BarCharts from '../vis-definitions/definitions-merged'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'bar-visualisations_merged-dataset',
  name: 'Bar - Merged dataset',
  description:
    'This dashboard represents example bar visualisations using a merged dataset. The dashboard aims to show all the options available to display a bar using a merged dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts from a list',
      description: 'Examples of bar charts where the bars are generated from list values',
      visualisations: [
        BarCharts.dietTotalsBar,
        BarCharts.dietTotalsByEstablishmentBar,
        BarCharts.dietTotalsByEstablishmentByWingBar,
        BarCharts.dietTotalsByEstablishmentByWingByCellBar,
      ],
    },
    {
      id: 'section-2',
      display: 'Bar charts with units',
      description: 'Examples of bar charts where the bars are generated from list values, with units',
      visualisations: [BarCharts.dietTotalsByEstablishmentBarWithUnit],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
