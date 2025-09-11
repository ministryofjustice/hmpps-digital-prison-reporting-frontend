import chartDefs from './age-breakdown/visualisations/ethnicityReligionDefinitions'
import cardDefs from './age-breakdown/visualisations/scorecard-definitions-nationality-ethnicity-religion'
import vizExamples from './visualisations/lists'

import { establishmentIdFilter, granularDateRangeFilter } from '@networkMocks/dashboard/filter-definitions'

import type { DashboardDefinition } from '../../../src/dpr/components/_dashboards/dashboard/types'

export const testingDashboard8: DashboardDefinition = {
  id: 'test-dashboard-8',
  name: 'Test Dashboard',
  description: 'Dashboard used for testing testing',
  sections: [
    {
      id: 'test-section-1',
      display: 'Section 1 - Ethnicity charts',
      description: 'Section 1 description - charts showing ethnicity data',
      visualisations: [chartDefs.mockEthnicityBarChart, chartDefs.mockEthnicityPieChart, chartDefs.mockEthnicityBarChartList],
    },
    {
      id: 'test-section-2',
      display: 'Section 2 - Nationality charts',
      description: 'Section 2 description - charts showing nationality data',
      visualisations: [chartDefs.mockNationalityBarChart, chartDefs.mockNationalityPieChart],
    },
    {
      id: 'test-section-3',
      display: 'Section 3 - Religion charts',
      description: 'Section 3 description - charts showing religion data',
      visualisations: [chartDefs.mockReligionBarChart, chartDefs.mockReligionPieChart],
    },
    {
      id: 'test-section-4',
      display: 'Section 4 - Individual Scorecards',
      description: 'Section 4 description - Testing individually defined scorecards',
      visualisations: [
        cardDefs.mockScorecardDefinitionNationality,
        cardDefs.mockScorecardDefinitionNoNationality,
        cardDefs.mockScorecardDefinitionReligion,
      ],
    },
    {
      id: 'test-section-5',
      display: 'Section 5 - Individual Scorecards targeting values',
      description: 'Section 5 description - Testing individually defined scorecards that target specfic column value',
      visualisations: [cardDefs.mockTargetScorecardDefinitionReligion],
    },
    {
      id: 'test-section-6',
      display: 'Section 6 - Scorecard Group',
      description: 'Section 6 description - Testing scorecard groups created from list data',
      visualisations: [
        cardDefs.mockScorecardGroupReligionByEstablishment,
        cardDefs.mockScorecardGroupNationalityByEstablishment,
        cardDefs.mockScorecardGroupEthnicityByEstablishment,
      ],
    },
    {
      id: 'test-section-7',
      display: 'Section 7 - Timeseries charts',
      description: 'Section 7 description - Testing timeseries charts',
      visualisations: [chartDefs.mockEthnicityLineChartTimeseries],
    },
    {
      id: 'all-data',
      display: 'All Data',
      description: '',
      visualisations: [vizExamples.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}
