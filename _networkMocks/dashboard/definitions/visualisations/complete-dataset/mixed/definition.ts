import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import * as BarChart from '../bar/vis-definitions/cols-as-labels'
import * as DoughnutChart from '../doughnut/vis-definitions/definitions'
import * as LineChart from '../line/vis-definitions/cols-as-labels'
import * as LineTimeseriesChart from '../line-timeseries/vis-definitions/defintitions'
import * as ListChart1 from '../list/vis-definitions/column-values-as-list'
import * as ListChart2 from '../list/vis-definitions/rows-as-list'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'mixed-visualisations_complete-dataset',
  name: 'Mixed - Complete dataset',
  description:
    'This dashboard represents example Mixed visualisations using a complete dataset. The dashboard aims to show all the options available to display a Mixed charts using a complete dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Bar charts',
      description: 'Bar chart examples for testing',
      visualisations: [
        BarChart.dataQualityMetricOneBar,
        BarChart.dataQualityAllBar,
        BarChart.dataQualityMetricOneBarHorizontal,
      ],
    },
    {
      id: 'section-2',
      display: 'Doughnut charts',
      description: 'Doughnut chart examples for testing',
      visualisations: [
        DoughnutChart.dataQualityMetricOneDoughnut,
        DoughnutChart.dataQualityMetricTwoDoughnutTwoEst,
        DoughnutChart.dataQualityMetricTwoMetricThreeDoughnutAllEst,
      ],
    },
    {
      id: 'section-3',
      display: 'Line charts',
      description: 'Line chart examples for testing',
      visualisations: [LineChart.dataQualityMetricOneMetricTwoLine, LineChart.dataQualityAllLine],
    },
    {
      id: 'section-4',
      display: 'Line-timeseries charts',
      description: 'Line chart examples for testing',
      visualisations: [
        LineTimeseriesChart.mockMetricOneLineChartTimeseries,
        LineTimeseriesChart.mockMetricTwoLineChartTimeseriesAllEst,
      ],
    },
    {
      id: 'section-5',
      display: 'List',
      description: 'List chart examples for testing',
      visualisations: [
        ListChart1.columnValuesAsList,
        ListChart2.dataQualityMetricOne,
        ListChart2.dataQualityMetricThree,
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
