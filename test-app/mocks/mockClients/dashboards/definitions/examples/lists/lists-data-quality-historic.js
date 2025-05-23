const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const dataQualityHistoric = {
  id: 'list-examples-data-quality-historic',
  name: 'List Examples - Data Quality - Historic',
  description: 'list examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data Quality lists',
      description: '',
      visualisations: [
        lists.dataQualityEthnicityHistoric,
        lists.dataQualityNationalityHistoric,
        lists.dataQualityReligionHistoric,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  dataQualityHistoric,
}
