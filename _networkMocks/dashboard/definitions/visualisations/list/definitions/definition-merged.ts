import * as List from '../vis-definitions/column-values-as-list-merged'
import { fullDataset } from '../vis-definitions/full-data'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'list-visualisations_merged-dataset',
  name: 'List - Merged dataset',
  description:
    'This dashboard represents example list visualisations using a merged dataset. The dashboard aims to show all the options available to display a list using a merged dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Column values as list',
      description: 'These list examples display the dataset column values as a list',
      visualisations: [
        List.dietTotals,
        List.dietTotalsByEstablishment,
        List.dietTotalsByEstablishmentByWing,
        List.dietTotalsByEstablishmentByWingByCell,
        List.dietTotalsByEstablishmentByWingByCellFilters,
        List.dietTotalsWithFilters,
        List.dietTotalsWithFiltersSingleColumn,
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
