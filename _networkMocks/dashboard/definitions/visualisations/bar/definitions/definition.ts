import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../../list/vis-definitions/full-data'
import * as BarChart from '../vis-definitions/cols-as-labels'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'bar-visualisations',
  name: 'Bar ',
  description:
    'This dashboard represents example Bar visualisations using the default dataset. The dashboard aims to show all the options available to display a Bar using the default dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Simple bar charts',
      description: 'Examples of simple bar charts',
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
      description: 'Examples of horizontal bar charts',
      visualisations: [BarChart.dataQualityMetricOneBarHorizontal, BarChart.dataQualityAllBarHorizontal],
    },
    {
      id: 'section-2',
      display: 'Specified Unit type',
      description: 'Examples of bar charts with specified units',
      visualisations: [BarChart.dataQualityAllBarWithUnit, BarChart.dataQualityAllBarWithUnitHorizontal],
    },
    {
      id: 'section-3',
      display: 'Stacked bar charts',
      description: 'Examples of stacked bar charts',
      visualisations: [BarChart.verticalStackedBarChart, BarChart.horizontalStackedBarChart],
    },
    {
      id: 'totals-breakdown',
      display: 'Full Dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
