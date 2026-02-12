import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../complete-dataset/list/vis-definitions/full-data'
import * as LineTimeseriesCharts from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations_partial-dataset',
  name: 'line-timeseries - Partial dataset',
  description:
    'This dashboard represents example line-timeseries visualisations using a partial dataset. The dashboard aims to show all the options available to display a line-timeseries using a partial dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1 title',
      description: 'Section 1 description',
      visualisations: [
        LineTimeseriesCharts.dietTotalsOverTime,
        LineTimeseriesCharts.dietTotalsByEstablishmentOverTime,
        LineTimeseriesCharts.dietTotalsVegetarianOvertime,
        LineTimeseriesCharts.dietTotalsVeganOvertime,
        LineTimeseriesCharts.dietTotalsVegetarianOvertimeByEstByWingLine,
        LineTimeseriesCharts.dietTotalsVegetarianOvertimeByEstLine,
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
