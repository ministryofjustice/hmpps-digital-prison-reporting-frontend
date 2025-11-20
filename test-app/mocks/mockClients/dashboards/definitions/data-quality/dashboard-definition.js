// @ts-nocheck
const {
  mockEthnicityBarChart,
  mockEthnicityPieChart,
  mockNationalityBarChart,
  mockNationalityPieChart,
  mockReligionBarChart,
  mockReligionPieChart,
} = require('./visualisations')

const { lists, charts, scorecards } = require('../examples/visualisations')

const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const dataQualityDashboard1 = {
  id: 'data-quality-dashboard-1',
  name: 'Data quality dashboard',
  description: 'Testing a dashboard with timeseries chart & snapshot chart',
  sections: [
    {
      id: 'charts-section-ethnicity-breakdown',
      display: 'Totals',
      description: 'Overall data quality values',
      visualisations: [lists.dataQualityColsToList],
    },
    {
      id: 'charts-section-ethnicity-breakdown',
      display: 'Totals overtime',
      visualisations: [lists.dataQualityEthnicityHistoric],
    },
    {
      id: 'charts-section-ethnicity',
      display: 'Ethnicity totals',
      description: 'Overall data quality values',
      visualisations: [mockEthnicityBarChart, mockEthnicityPieChart, lists.dataQualityEthnicity],
    },
    {
      id: 'charts-section-religion',
      display: 'Religion totals',
      visualisations: [mockReligionBarChart, mockReligionPieChart, lists.dataQualityReligion],
    },
    {
      id: 'charts-section-nationality',
      display: 'Nationality totals',
      visualisations: [mockNationalityBarChart, mockNationalityPieChart, lists.dataQualityNationality],
    },
    {
      id: 'historic',
      display: 'Data quality over time',
      visualisations: [
        charts.dataQualityEthnicityHistoricLine,
        charts.dataQualityNationalityHistoricLine,
        charts.dataQualityReligionHistoricLine,
      ],
    },
    {
      id: 'scorecards-section',
      display: 'Scorecards',
      visualisations: [scorecards.dataQualityAllCols],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  dataQualityDashboard1,
}
