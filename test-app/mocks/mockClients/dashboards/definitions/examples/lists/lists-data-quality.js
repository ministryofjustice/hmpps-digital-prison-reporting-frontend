const { establishmentIdFilter } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const dataQuality = {
  id: 'list-examples-data-quality',
  name: 'List Examples - Data Quality',
  description: 'list examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data Quality lists',
      description: '',
      visualisations: [lists.dataQualityEthnicity, lists.dataQualityReligion, lists.dataQualityNationality],
    },
    {
      id: 'section-2',
      display: 'Columns as list',
      description: '',
      visualisations: [lists.dataQualityColsToList],
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
  dataQuality,
}
