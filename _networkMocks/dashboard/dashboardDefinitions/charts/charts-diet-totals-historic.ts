import {
  establishmentIdFilter,
  granularDateRangeFilter,
  wingFilterCompass,
} from '@networkMocks/dashboard/filter-definitions'
import lists from '../visualisations/lists'
import charts from '../visualisations/charts'

export const historicDietTotals = {
  id: 'chart-examples-diet-totals-historic',
  name: 'Charts Examples - Diet Totals - Historic',
  description: 'List examples',
  sections: [
    {
      id: 'section-1',
      display: 'Historic Totals',
      description: '',
      visualisations: [
        lists.dietTotalsOverTime,
        charts.dietTotalsOverTime,
        lists.dietTotalsByEstablishmentOverTime,
        charts.dietTotalsByEstablishmentOverTime,
        lists.dietTotalsByEstablishmentByWingOverTime,
        charts.dietTotalsByEstablishmentByWingOverTime,
      ],
    },
    {
      id: 'section-2',
      display: 'Historic Diet Totals',
      description: '',
      visualisations: [
        lists.dietTotalsVegetarianOvertime,
        charts.dietTotalsVegetarianOvertime,
        lists.dietTotalsVeganOvertime,
        charts.dietTotalsVeganOvertime,
      ],
    },
    {
      id: 'section-3',
      display: 'Historic Diet By Key Totals',
      description: '',
      visualisations: [
        lists.dietTotalsVegetarianOvertimeByEst,
        charts.dietTotalsVegetarianOvertimeByEstLine,
        lists.dietTotalsVegetarianOvertimeByEstByWing,
        charts.dietTotalsVegetarianOvertimeByEstByWingLine,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass, granularDateRangeFilter],
}
