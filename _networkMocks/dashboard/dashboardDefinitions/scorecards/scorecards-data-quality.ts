import { establishmentIdFilter, granularDateRangeFilter, wingFilterCompass } from '@networkMocks/dashboard/filter-definitions'
import scorecards from '../visualisations/scorecards'
import lists from '../visualisations/lists'

export const dataQualityScoreCards = {
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
      id: 'section-2',
      display: 'Scorecards with columns',
      visualisations: [scorecards.dataQualityAllCols],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass, granularDateRangeFilter],
}
