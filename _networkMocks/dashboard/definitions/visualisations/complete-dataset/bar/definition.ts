import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import * as BarChart from './vis-definitions/cols-as-labels'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'bar-visualisations_complete-dataset',
  name: 'Bar - Complete dataset',
  description:
    'This dashboard represents example Bar visualisations using a complete dataset. The dashboard aims to show all the options available to display a Bar using a complete dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Simple bar charts',
      description: 'Section 1 description',
      visualisations: [
        BarChart.dataQualityMetricOneBar,
        BarChart.dataQualityMetricTwoBar,
        BarChart.dataQualityMetricThreeBar,
        BarChart.dataQualityAllBar,
      ],
    },
    {
      id: 'section-2',
      display: 'Horizontal bar charts',
      description: 'Section 1 description',
      visualisations: [BarChart.dataQualityMetricOneBarHorizontal, BarChart.dataQualityAllBarHorizontal],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
