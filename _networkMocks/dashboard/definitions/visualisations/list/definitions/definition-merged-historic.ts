import { fullDatasetHistoric } from '../vis-definitions/full-data'
import * as List from '../vis-definitions/merged-historic'
import { components } from '../../../../../../src/dpr/types/api'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'list-visualisations_merged-dataset_historic',
  name: 'List - Merged dataset - Historic',
  description:
    'This dashboard represents example list visualisations using a merged dataset of historic data. The dashboard aims to show all the options available to display a list using a merged dataset',
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
        List.dietTotalsDietOneOvertime,
        List.dietTotalsDietOneOvertimeByEst,
        List.dietTotalsDietOneOvertimeByEstByWing,
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
