// @ts-nocheck
const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, line } = require('../visualisations')

const lineChartDashboard = {
  id: 'line-chart-examples-dashboard',
  name: 'Line chart Examples - Data Quality',
  description: 'A set of line chart examples using a mocked data quality dataset',
  sections: [
    {
      id: 'section-1',
      display: 'Basic Line charts',
      description: 'A set of simple barcharts',
      visualisations: [line.dataQualityLine, line.dataQualityNationalityLine, line.dataQualityReligionLine],
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
  lineChartDashboard,
}
