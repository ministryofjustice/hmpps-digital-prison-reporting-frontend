// @ts-nocheck
const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, doughnut } = require('../visualisations')

const doughnutChartDashboard = {
  id: 'doughnut-chart-examples-dashboard',
  name: 'Doughnut chart Examples - Data Quality',
  description: 'A set of doughnut chart examples using a mocked data quality dataset',
  sections: [
    {
      id: 'section-1',
      display: 'Basic Doughnut charts',
      description: 'A set of simple barcharts',
      visualisations: [
        doughnut.dataQualityEthnicityDoughnut,
        doughnut.dataQualityNationalityDoughnut,
        doughnut.dataQualityReligionDoughnut,
        doughnut.dataQualityNationalityReligionDoughnut,
      ],
    },
    {
      id: 'section-3',
      display: 'Dashboard dataset',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  doughnutChartDashboard,
}
