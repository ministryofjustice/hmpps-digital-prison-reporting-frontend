import { components } from '../../../../src/dpr/types/api'

const mockEthnicityBarChart: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityBarChart',
  type: 'bar',
  display: 'Missing Ethnicity Bar Chart',
  description: 'Prisoner totals for missing ethnicity',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_ethnicity',
        display: 'Has ethnicity',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
      },
    ],
  },
}

const mockEthnicityBarChartList: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockEthnicityBarChartFromList',
  type: 'bar',
  display: 'Missing Ethnicity Bar Chart from list',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
    expectNulls: false,
    keys: [],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        axis: 'x',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
        axis: 'y',
      },
    ],
  },
}

const barCharts = {
  mockEthnicityBarChart,
  mockEthnicityBarChartList,
}

export default barCharts
