import * as Scorecards from './vis-definitions/definitions'

export const definition = {
  id: 'scorecard-group-example_complete-data',
  name: 'Scorecard Group - Complete data',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Data quality scorecards',
      description: '',
      visualisations: [
        Scorecards.dataQualityAllEstablishmentsEthnicity,
        Scorecards.dataQualityAllEstablishmentsNoEthnicity,
        Scorecards.dataQualityAllEstablishmentsNationality,
        Scorecards.dataQualityAllEstablishmentsNoNationality,
        Scorecards.dataQualityAllEstablishmentsReligion,
        Scorecards.dataQualityAllEstablishmentsNoReligion,
      ],
    },
    {
      id: 'section-2',
      display: 'Scorecards with columns',
      visualisations: [Scorecards.dataQualityAllCols],
    },
  ],
  filterFields: [],
}
