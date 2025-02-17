const { establishmentIdFilter, wingFilterCompass } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const fallBackKeysDashboard = {
  id: 'list-examples-fallback-keys',
  name: 'List Examples - Fallback Keys',
  description: 'List examples',
  sections: [
    {
      id: 'fall-back-keys',
      display: 'Fallback keys',
      description:
        'Examples of lists where keys are optional. Row filtering depends on the presence of values in the key columns. If a key is optional, and no rows have a value for the key, it will fallback to the next key',
      visualisations: [lists.explicitKeys, lists.optionalKey, lists.allOptional],
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
  fallBackKeysDashboard,
}
