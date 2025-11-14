// @ts-nocheck
const mockEthnicityBarChart = {
  id: 'mockEthnicityBarChart',
  type: 'bar',
  display: 'Missing Ethnicity Bar Chart',
  description: 'Prisoner totals for missing ethnicity',
  columns: {
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

const mockEthnicityBarChartList = {
  id: 'mockEthnicityBarChartFromList',
  type: 'bar',
  display: 'Missing Ethnicity Bar Chart from list',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
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

const mockEthnicityLineChartTimeseries = {
  id: 'mockEthnicityLineChartTimeseries',
  type: 'line-timeseries',
  display: 'Missing ethnicity timeseries chart',
  description: 'Prisoner totals for missing ethnicity by establishment',
  columns: {
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

const mockEthnicityPieChart = {
  ...mockEthnicityBarChart,
  id: 'mockEthnicityPieChart',
  type: 'doughnut',
  display: 'Missing Ethnicity Pie Chart',
}

const mockNationalityBarChart = {
  id: 'mockNationalityBarChart',
  type: 'bar',
  display: 'Missing Nationality Bar Chart',
  description: 'Prisoner totals for missing nationality',
  columns: {
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

const mockReligionPieChart = {
  ...mockNationalityBarChart,
  id: 'mockReligionPieChart',
  type: 'doughnut',
  display: 'Missing Nationality Pie Chart',
}

const mockReligionBarChart = {
  id: 'mockReligionBarChart',
  type: 'bar',
  display: 'Missing Religion Bar Chart',
  description: 'Prisoner totals for missing religion',
  columns: {
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

const mockNationalityPieChart = {
  ...mockNationalityBarChart,
  id: 'mockNationalityPieChart',
  type: 'doughnut',
  display: 'Missing Religion Pie Chart',
}

module.exports = {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
  mockEthnicityBarChartList,
  mockEthnicityLineChartTimeseries,
}
