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
      description: 'Section 1 description',
      visualisations: [
        DoughnutChart.dataQualityEthnicityDoughnut,
        DoughnutChart.dataQualityNationalityDoughnut,
        DoughnutChart.dataQualityNationalityReligionDoughnut,
        DoughnutChart.dataQualityReligionDoughnut,
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
