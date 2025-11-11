import { components } from '../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

const mockScorecardDefinitionNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockNationalityScorecard',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with nationality',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_nationality',
      },
    ],
  },
}

const mockScorecardDefinitionNoNationality: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockNoNationalityScorecard',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with no nationality',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'nationality_is_missing',
      },
    ],
  },
}

const mockScorecardDefinitionReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockReligionScorecard',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with nationality',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_religion',
      },
    ],
  },
}

const mockTargetScorecardDefinitionReligion: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockReligionTargetScorecard',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with religion in SLI',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_religion',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'SLI',
      },
    ],
  },
}

const mockScorecardGroupReligionByEstablishment: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'religion-by-est-sc-group',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Has religion by Establishment',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'With religion in Establishment: ',
      },
      {
        id: 'has_religion',
        displayValue: true,
      },
    ],
  },
}

const mockScorecardGroupNationalityByEstablishment: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'nationality-by-est-sc-group',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Has nationality by Establishment',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'With nationality in establishment: ',
      },
      {
        id: 'has_nationality',
        displayValue: true,
      },
    ],
  },
}

const mockScorecardGroupEthnicityByEstablishment: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'ethnicity-by-est-sc-group',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Has ethnicity by Establishment',
  columns: {
    expectNulls: false,
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'With ethnicity in establishment: ',
      },
      {
        id: 'has_ethnicity',
        displayValue: true,
      },
    ],
  },
}

export default {
  mockScorecardDefinitionNationality,
  mockScorecardDefinitionNoNationality,
  mockScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
  mockScorecardGroupNationalityByEstablishment,
  mockScorecardGroupEthnicityByEstablishment,
  mockTargetScorecardDefinitionReligion,
}
