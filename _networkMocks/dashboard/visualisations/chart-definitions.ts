import { DashboardVisualisation, DashboardVisualisationType } from "../../../src/dpr/components/_dashboards/dashboard/types"

const mockEthnicityBarChart: DashboardVisualisation = {
  id: 'mockEthnicityBarChart',
  type: DashboardVisualisationType.BAR,
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

const mockEthnicityBarChartList: DashboardVisualisation = {
  id: 'mockEthnicityBarChartFromList',
  type: DashboardVisualisationType.BAR,
  display: 'Missing Ethnicity Bar Chart from list',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
    keys: [],
    expectNulls: false,
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

const mockEthnicityLineChartTimeseries: DashboardVisualisation = {
  id: 'mockEthnicityLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Missing ethnicity timeseries chart',
  description: 'Prisoner totals for missing ethnicity by establishment',
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
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'ethnicity_is_missing',
        display: 'Has no ethnicity',
      },
    ],
  },
}

const mockEthnicityPieChart: DashboardVisualisation = {
  ...mockEthnicityBarChart,
  id: 'mockEthnicityPieChart',
  type: DashboardVisualisationType.DONUT,
  display: 'Missing Ethnicity Pie Chart',
}

const mockNationalityBarChart: DashboardVisualisation = {
  id: 'mockNationalityBarChart',
  type: DashboardVisualisationType.BAR,
  display: 'Missing Nationality Bar Chart',
  description: 'Prisoner totals for missing nationality',
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
        id: 'has_nationality',
        display: 'Has nationality',
      },
      {
        id: 'nationality_is_missing',
        display: 'Has no nationality',
      },
    ],
  },
}

const mockReligionPieChart: DashboardVisualisation = {
  ...mockNationalityBarChart,
  id: 'mockReligionPieChart',
  type: DashboardVisualisationType.DONUT,
  display: 'Missing Nationality Pie Chart',
}

const mockReligionBarChart: DashboardVisualisation = {
  id: 'mockReligionBarChart',
  type: DashboardVisualisationType.BAR,
  display: 'Missing Religion Bar Chart',
  description: 'Prisoner totals for missing religion',
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
        id: 'has_religion',
        display: 'Has religion',
      },
      {
        id: 'religion_is_missing',
        display: 'Has no religion',
      },
    ],
  },
}

const mockNationalityPieChart: DashboardVisualisation = {
  ...mockNationalityBarChart,
  id: 'mockNationalityPieChart',
  type: DashboardVisualisationType.DONUT,
  display: 'Missing Religion Pie Chart',
}

export default {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
  mockEthnicityBarChartList,
  mockEthnicityLineChartTimeseries,
}
