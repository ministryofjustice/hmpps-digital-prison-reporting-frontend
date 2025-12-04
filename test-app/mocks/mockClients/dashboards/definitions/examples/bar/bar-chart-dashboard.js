// @ts-nocheck
const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, bar } = require('../visualisations')

const barChartDashboard = {
  id: 'bar-chart-examples-dashboard',
  name: 'Bar chart Examples - Data Quality',
  description: 'A set of bar chart examples using a mocked data quality dataset',
  sections: [
    {
      id: 'section-1',
      display: 'Basic Bar charts',
      description: 'A set of simple barcharts',
      visualisations: [
        bar.dataQualityEthnicityBar,
        bar.dataQualityNationalityBar,
        bar.dataQualityReligionBar,
        bar.dataQualityAllBar,
      ],
    },
    {
      id: 'section-2',
      display: 'Bar charts from list',
      visualisations: [bar.dataQualityListBar],
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
  barChartDashboard,
}
