const { establishmentIdFilter, wingFilterCompass } = require('../../../filter-definitions')
const { charts, lists } = require('../visualisations')

const flexibleDietTotals = {
  id: 'chart-examples-diet-totals-flexible',
  name: 'Chart Examples - Diet Totals - Flexible',
  description: 'Demonstrates flexible charts',
  sections: [
    {
      id: 'section-1',
      display: 'Flexible Diet Totals charts',
      description: '',
      visualisations: [
        charts.dietTotalsByEstablishmentByWingBarOptional,
        charts.dietTotalsByEstablishmentByWingByCellBarOptional,
        charts.dietTotalsByEstablishmentByWingByCellPieOptional,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass],
}

module.exports = {
  flexibleDietTotals,
}
