const {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
} = require('./vis-definitions')

const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const dataQualityDashboard1 = {
  id: 'data-quality-dashboard-1',
  name: 'Data quality dashboard',
  description: 'Testing a dashboard with timeseries chart & snapshot chart',
  sections: [
    {
      id: 'charts-section',
      display: 'Charts Test Section',
      visualisations: [
        mockEthnicityBarChart,
        mockEthnicityPieChart,
        mockNationalityBarChart,
        mockNationalityPieChart,
        mockReligionBarChart,
        mockReligionPieChart,
      ],
    },
    {
      id: 'scorecards-section',
      display: 'Scorecards Test Section',
      visualisations: [],
    },
    {
      id: 'scorecards-section',
      display: 'Timeseries Test Section',
      visualisations: [],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  dataQualityDashboard1,
}
