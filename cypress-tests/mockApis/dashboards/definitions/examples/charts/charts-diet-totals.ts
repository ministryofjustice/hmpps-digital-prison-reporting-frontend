import { establishmentIdFilter, wingFilterCompass } from '../../../filter-definitions'
import lists from '../visualisations/lists'
import charts from '../visualisations/charts'

export const dietTotals = {
  id: 'chart-examples-diet-totals',
  name: 'Chart Examples - Diet Totals',
  description: 'chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Diet Totals',
      description: '',
      visualisations: [lists.dietTotals, charts.dietTotalsBar, charts.dietTotalsDoughnut],
    },
    {
      id: 'section-2',
      display: 'Diet Totals by establishment',
      description: '',
      visualisations: [
        lists.dietTotalsByEstablishment,
        charts.dietTotalsByEstablishmentBar,
        charts.dietTotalsByEstablishmentDoughnut,
      ],
    },
    {
      id: 'section-3',
      display: 'Diet Totals by establishment and wing',
      description: '',
      visualisations: [
        lists.dietTotalsByEstablishmentByWing,
        charts.dietTotalsByEstablishmentByWingBar,
        charts.dietTotalsByEstablishmentByWingDoughnut,
      ],
    },
    {
      id: 'section-4',
      display: 'Diet Totals by cell',
      description: '',
      visualisations: [lists.dietTotalsByEstablishmentByWingByCell, charts.dietTotalsByEstablishmentByWingByCellBar],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass],
}
