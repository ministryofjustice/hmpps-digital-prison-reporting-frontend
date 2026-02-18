import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import * as DoughnutChart from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'doughnut-visualisations_complete-dataset',
  name: 'Doughnut - Complete dataset',
  description:
    'This dashboard represents example Doughnut visualisations using a complete dataset. The dashboard aims to show all the options available to display a Doughnut using a complete dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Simple Doughnut charts',
      description: 'Examples of simple Doughnut charts',
      visualisations: [
        DoughnutChart.dataQualityMetricOneDoughnut,
        DoughnutChart.dataQualityMetricTwoDoughnut,
        DoughnutChart.dataQualityReligionDoughnut,
        DoughnutChart.dataQualityMetricTwoReligionDoughnut,
      ],
    },
    {
      id: 'section-2',
      display: 'Two ring Doughnut charts ',
      description: 'Examples of Doughnut charts with 2 rings',
      visualisations: [
        DoughnutChart.dataQualityMetricOneDoughnutTwoEst,
        DoughnutChart.dataQualityMetricTwoDoughnutTwoEst,
        DoughnutChart.dataQualityReligionDoughnutTwoEst,
        DoughnutChart.dataQualityMetricTwoReligionDoughnutTwoEst,
      ],
    },
    {
      id: 'section-3',
      display: 'Multiple rings Doughnut charts ',
      description: 'Examples of Doughnut charts with multiple rings',
      visualisations: [
        DoughnutChart.dataQualityMetricOneDoughnutAllEst,
        DoughnutChart.dataQualityMetricTwoDoughnutAllEst,
        DoughnutChart.dataQualityReligionDoughnutAllEst,
        DoughnutChart.dataQualityMetricTwoReligionDoughnutAllEst,
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
