import { components } from '../../../../../../src/dpr/types/api'
import { fullDataset } from '../list/vis-definitions/full-data'
import * as BoxPlotChart from './vis-definitions/definitions'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'box-plot-chart-examples-dashboard',
  name: 'Box plot chart Examples',
  description: 'A set of box plot chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Basic box plot charts - wide',
      description: 'A set of simple box plot charts using wide data',
      visualisations: [BoxPlotChart.boxBlotWide1, BoxPlotChart.boxBlotWide2],
    },
    {
      id: 'section-2',
      display: 'Basic box plot charts - grouped',
      description: 'A set of simple box plot charts using grouped data',
      visualisations: [
        // BoxPlotChart.boxBlotGrouped1,
        // BoxPlotChart.boxBlotGrouped2,
        // BoxPlotChart.boxBlotGrouped3,
        // BoxPlotChart.boxBlotGrouped4,
      ],
    },
    {
      id: 'section-2',
      display: 'Dashboard dataset',
      visualisations: [fullDataset],
    },
  ],
  filterFields: [],
}
