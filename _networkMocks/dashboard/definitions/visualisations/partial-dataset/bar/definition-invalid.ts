import { components } from '../../../../../../src/dpr/types/api'
import * as InvalidBarCharts from './vis-definitions/invalid'

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'bar-visualisations_invalid-vis-def',
  name: 'Bar - Invalid visualisation',
  description: 'This dashboard represents example of invlaid bar visualisation definition using a partial dataset.',
  sections: [
    {
      id: 'section-1',
      display: 'Section 1 title',
      description: 'Section 1 description',
      visualisations: [InvalidBarCharts.invalidAxisXBar, InvalidBarCharts.invalidAxisYBar],
    },
  ],
  filterFields: [],
}
