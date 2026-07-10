// @ts-nocheck
const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, bar } = require('../visualisations')

const barChartStackedDashboard = {
  id: 'bar-chart-stacked-examples-dashboard',
  name: 'Stacked Bar Charts Examples',
  description: 'A set of stacked bar chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Stacked Bar Charts',
      description: 'A set of simple stacked bar charts',
      visualisations: [bar.verticalStackedBar, bar.horizontalStackedBar],
    },
    {
      id: 'section-3',
      display: 'Dashboard dataset',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [],
}

module.exports = {
  barChartStackedDashboard,
}
