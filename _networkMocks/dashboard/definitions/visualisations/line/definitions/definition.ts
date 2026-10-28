import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as LineChart from '../vis-definitions/cols-as-labels'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'line-visualisations',
  name: 'Line ',
  description:
    'This dashboard represents example Line visualisations using the default dataset. The dashboard aims to show all the options available to display a Line using the default dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Simple Line charts',
      description: 'Example line charts',
      visualisations: [LineChart.dataQualityMetricOneMetricTwoLine, LineChart.dataQualityAllLine],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
