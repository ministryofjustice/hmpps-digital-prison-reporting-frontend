import { components } from '../../../../src/dpr/types/api'
import bar from './bar'

const mockEthnicityPieChart: components['schemas']['DashboardVisualisationDefinition'] = {
  ...bar.mockEthnicityBarChart,
  id: 'mockEthnicityPieChart',
  type: 'doughnut',
  display: 'Missing Ethnicity Pie Chart',
}

const doughnutCharts = {
  mockEthnicityPieChart,
}

export default doughnutCharts
