const { establishmentIdFilter, wingFilterCompass } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const dietTotals = {
  id: 'list-examples-diet-totals',
  name: 'List Examples - Diet Totals',
  description: 'List examples',
  sections: [
    {
      id: 'section-1',
      display: 'Diet Totals',
      description: '',
      visualisations: [lists.dietTotals, lists.dietTotalsByEstablishment, lists.dietTotalsByEstablishmentByWing],
    },
    {
      id: 'section-2',
      display: 'Diet Totals with optional keys',
      description: '',
      visualisations: [lists.dietTotalsByEstablishmentOptional, lists.dietTotalsByEstablishmentByWingOptional],
    },
    {
      id: 'section-3',
      display: 'Diet Totals by cell',
      description: '',
      visualisations: [lists.dietTotalsByEstablishmentByWingByCell],
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
  dietTotals,
}
