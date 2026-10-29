import { components } from '../../../../../../src/dpr/types/api'
import { fullDatasetHistoric } from '../../list/vis-definitions/full-data'
import * as LineTimeseriesCharts from '../vis-definitions/definitions-merged'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-timeseries-visualisations_merged-dataset',
  name: 'Line-timeseries - Merged dataset',
  description:
    'This dashboard represents example line-timeseries visualisations using a merged dataset. The dashboard aims to show all the options available to display a line-timeseries using a merged dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1 title',
      description: 'Section 1 description',
      visualisations: [
        LineTimeseriesCharts.dietTotalsOverTime,
        LineTimeseriesCharts.dietTotalsByEstablishmentOverTime,
        LineTimeseriesCharts.dietTotalsDietOneOvertime,
        LineTimeseriesCharts.dietTotalsDietThreeOvertime,
        LineTimeseriesCharts.dietTotalsDietOneOvertimeByEstByWingLine,
        LineTimeseriesCharts.dietTotalsDietOneOvertimeByEstLine,
        LineTimeseriesCharts.dietTotalsDietOneOvertimeByEstByWingAndCellLine,
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
