const { establishmentIdFilter, wingFilterCompass } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const dietTotalsFullDataset = {
  id: 'list-examples-diet-totals-full-set',
  name: 'Diet totals data set',
  description: 'Diet total full dataset',
  sections: [
    {
      id: 'full-set',
      display: 'Full data set',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass],
}

module.exports = {
  dietTotalsFullDataset,
}
