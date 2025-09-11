import { establishmentIdFilter, wingFilter } from '../filter-definitions'
import { mockListDefinitionAgeRange1, mockListDefinitionAgeRange1Wing, mockListDefinitionAgeRange2, mockListDefinitionAgeRange2Wing, mockListDefinitionCell, mockListDefinitionEthnicity, mockListDefinitionEthnicityAgeRange, mockListDefinitionEthnicityByEst, mockListDefinitionNationality, mockListDefinitionNationalityByWing, mockListDefinitionReligion, mockListDefinitionReligionByEst, mockListDefinitionTotalPrisoners, mockListDefinitionTotalPrisonersByWing } from './age-breakdown/visualisations/list-definitions'

export const ageBreakdownReport3 = {
  id: 'age-breakdown-dashboard-3',
  name: 'Age Breakdown - Mocked data generator',
  description:
    'Description of the age breakdown report - This is a mocked data version of the age breakdown report, in order to test and demo dashboards with lists',
  sections: [
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [mockListDefinitionTotalPrisonersByWing, mockListDefinitionTotalPrisoners],
    },
    {
      id: 'total-prisoners-by-date-range',
      display: 'Total Prisoners by age range',
      description: 'These tables show the total prisoners over different age ranges',
      visualisations: [mockListDefinitionAgeRange1, mockListDefinitionAgeRange2],
    },
    {
      id: 'total-prisoners-by-religion',
      display: 'Total Prisoners by religion',
      description: 'These tables show the total prisoners by religion',
      visualisations: [mockListDefinitionReligionByEst, mockListDefinitionReligion],
    },
    {
      id: 'total-prisoners-by-ethnicity',
      display: 'Total Prisoners by ethnicity',
      description: 'These tables show the total prisoners by ethnicity',
      visualisations: [
        mockListDefinitionEthnicityByEst,
        mockListDefinitionEthnicity,
        mockListDefinitionEthnicityAgeRange,
      ],
    },
    {
      id: 'total-prisoners-cell',
      display: 'Total Prisoners by cell',
      description: 'This table shows the total prisoners by cell',
      visualisations: [mockListDefinitionCell],
    },
    {
      id: 'total-prisoners-age-range-by-wing',
      display: 'Total Prisoners by age range, by wing',
      description: 'These tables shows the total prisoners by age range, by wing',
      visualisations: [mockListDefinitionAgeRange1Wing, mockListDefinitionAgeRange2Wing],
    },
    {
      id: 'total-prisoners-by-nationality',
      display: 'Total Prisoners by Nationality',
      description: 'This table shows the total prisoners by nationality',
      visualisations: [mockListDefinitionNationality, mockListDefinitionNationalityByWing],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [
        {
          id: 'allData',
          type: 'list',
          display: 'All Data in dataset',
          columns: {},
        },
      ],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilter],
}
