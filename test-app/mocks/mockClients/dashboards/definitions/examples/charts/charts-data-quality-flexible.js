const { establishmentIdFilter } = require('../../../filter-definitions')
const { charts, lists } = require('../visualisations')

const dataQualityFlexible = {
  id: 'chart-examples-data-quality-flexible',
  name: 'Chart Examples - Flexible Data Quality',
  description: 'chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data Quality bar charts',
      description: '',
      visualisations: [],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter],
}

module.exports = {
  dataQualityFlexible,
}
