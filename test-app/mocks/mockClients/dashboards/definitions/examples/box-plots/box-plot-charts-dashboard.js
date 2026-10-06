// @ts-nocheck
const { establishmentIdFilter } = require('../../../filter-definitions')
const { boxPlots, lists } = require('../visualisations')

const boxPlotChartDashboard = {
  id: 'box-plot-chart-examples-dashboard',
  name: 'Box plot chart Examples',
  description: 'A set of box plot chart examples using grouped data',
  sections: [
    {
      id: 'section-1',
      display: 'Basic box plot charts - wide',
      description: 'A set of simple box plot charts using wide data',
      visualisations: [boxPlots.boxBlotWide1, boxPlots.boxBlotWide2],
    },
    {
      id: 'section-2',
      display: 'Basic box plot charts - grouped',
      description: 'A set of simple box plot charts using grouped data',
      visualisations: [boxPlots.boxBlotGrouped1, boxPlots.boxBlotGrouped2, boxPlots.boxBlotGrouped3],
    },
    {
      id: 'section-2',
      display: 'Dashboard dataset',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [],
}

module.exports = {
  boxPlotChartDashboard,
}
