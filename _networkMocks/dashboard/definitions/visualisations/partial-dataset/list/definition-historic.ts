import { fullDatasetHistoric } from '../../complete-dataset/list/vis-definitions/full-data'
import * as List from './vis-definitions/historic'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'list-visualisations_partial-dataset_historic',
  name: 'List - Partial dataset - Historic',
  description:
    'This dashboard represents example list visualisations using a partial dataset of historic data. The dashboard aims to show all the options available to display a list using a partial dataset',
  sections: [
    {
      id: 'section-1',
      display: '',
      description: 'List examples that display the dataset column values as a list with Historic data',
      visualisations: [
        List.dietTotalsAllDietOvertime,
        List.dietTotalsAllDietOvertimeByEst,
        List.dietTotalsByEstablishmentByWingOverTime,
        List.dietTotalsByEstablishmentOverTime,
        List.dietTotalsOverTime,
        List.dietTotalsVegetarianOvertime,
        List.dietTotalsVegetarianOvertimeByEst,
        List.dietTotalsVegetarianOvertimeByEstByWing,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDatasetHistoric],
    },
  ],
  filterFields: [],
}
