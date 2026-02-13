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
        DoughnutChart.dataQualityEthnicityDoughnut,
        DoughnutChart.dataQualityNationalityDoughnut,
        DoughnutChart.dataQualityReligionDoughnut,
        DoughnutChart.dataQualityNationalityReligionDoughnut,
      ],
    },
    {
      id: 'section-2',
      display: 'Two ring Doughnut charts ',
      description: 'Examples of Doughnut charts with 2 rings',
      visualisations: [
        DoughnutChart.dataQualityEthnicityDoughnutTwoEst,
        DoughnutChart.dataQualityNationalityDoughnutTwoEst,
        DoughnutChart.dataQualityReligionDoughnutTwoEst,
        DoughnutChart.dataQualityNationalityReligionDoughnutTwoEst,
      ],
    },
    {
      id: 'section-3',
      display: 'Multiple rings Doughnut charts ',
      description: 'Examples of Doughnut charts with multiple rings',
      visualisations: [
        DoughnutChart.dataQualityEthnicityDoughnutAllEst,
        DoughnutChart.dataQualityNationalityDoughnutAllEst,
        DoughnutChart.dataQualityReligionDoughnutAllEst,
        DoughnutChart.dataQualityNationalityReligionDoughnutAllEst,
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
