import * as List from './vis-definitions/column-values-as-list'
import { fullDataset } from '../../complete-dataset/list/vis-definitions/full-data'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'list-visualisations_partial-dataset',
  name: 'List - Partial dataset',
  description:
    'This dashboard represents example list visualisations using a partial dataset. The dashboard aims to show all the options available to display a list using a partial dataset.',
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
