// @ts-nocheck
const { establishmentIdFilter } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const dataQualityFullDataset = {
  id: 'list-examples-data-quality-dataset',
  name: 'Data quality data set',
  description: 'Data quality full dataset',
  sections: [
    {
      id: 'totals-breakdown',
      display: 'Full data set',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}

module.exports = {
  dataQualityFullDataset,
}
