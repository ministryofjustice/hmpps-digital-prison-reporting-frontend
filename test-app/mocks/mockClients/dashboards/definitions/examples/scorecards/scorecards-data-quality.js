const { establishmentIdFilter, wingFilterCompass, granularDateRangeFilter } = require('../../../filter-definitions')
const { scorecards, lists } = require('../visualisations')

const dataQualityScoreCards = {
  id: 'scorecard-examples-data-quality',
  name: 'Scorecard Examples - Data Quality',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data quality scorecards',
      description: '',
      visualisations: [
        scorecards.dataQualityAllEstablishmentsEthnicity,
        scorecards.dataQualityAllEstablishmentsNoEthnicity,
        scorecards.dataQualityAllEstablishmentsNationality,
        scorecards.dataQualityAllEstablishmentsNoNationality,
        scorecards.dataQualityAllEstablishmentsReligion,
        scorecards.dataQualityAllEstablishmentsNoReligion,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass, granularDateRangeFilter],
}

module.exports = {
  dataQualityScoreCards,
}
