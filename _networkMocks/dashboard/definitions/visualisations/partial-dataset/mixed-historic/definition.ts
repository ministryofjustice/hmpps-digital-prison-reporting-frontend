import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../complete-dataset/list/vis-definitions/full-data'
import * as LineTimeseriesCharts from '../line-timeseries/vis-definitions/definitions'
import * as ListChart from '../list/vis-definitions/historic'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'mixed-visualisations_partial-dataset_historic',
  name: 'Mixed - Partial dataset - Historic',
  description:
    'This dashboard represents example mixed visualisations using a partial dataset. The dashboard aims to show all the options available to display a mixed using a partial historic dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Line timeseries charts',
      description: 'Example Line timeseries charts',
      visualisations: [
        LineTimeseriesCharts.dietTotalsDietOneOvertimeByEstLine,
        LineTimeseriesCharts.dietTotalsDietThreeOvertime,
        LineTimeseriesCharts.dietTotalsByEstablishmentOverTime,
      ],
    },
    {
      id: 'section-2',
      display: 'List charts',
      description: 'Example List charts',
      visualisations: [
        ListChart.dietTotalsAllDietOvertimeByEst,
        ListChart.dietTotalsDietOneOvertime,
        ListChart.dietTotalsDietOneOvertimeByEstByWing,
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
