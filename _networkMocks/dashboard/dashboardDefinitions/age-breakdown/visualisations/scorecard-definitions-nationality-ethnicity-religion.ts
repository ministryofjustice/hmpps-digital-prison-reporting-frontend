import {
  DashboardVisualisation,
  DashboardVisualisationType,
} from '../../../../../src/dpr/components/_dashboards/dashboard/types'

const mockScorecardDefinitionNationality: DashboardVisualisation = {
  id: 'mockNationalityScorecard',
  type: DashboardVisualisationType.SCORECARD,
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
        display: 'No of prisoners with nationality',
      },
    ],
  },
}

const mockScorecardDefinitionNoNationality: DashboardVisualisation = {
  id: 'mockNoNationalityScorecard',
  type: DashboardVisualisationType.SCORECARD,
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
        display: 'No of prisoners with no nationality',
      },
    ],
  },
}

const mockScorecardDefinitionReligion: DashboardVisualisation = {
  id: 'mockReligionScorecard',
  type: DashboardVisualisationType.SCORECARD,
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
        display: 'No of prisoners with nationality',
      },
    ],
  },
}

const mockTargetScorecardDefinitionReligion: DashboardVisualisation = {
  id: 'mockReligionTargetScorecard',
  type: DashboardVisualisationType.SCORECARD,
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
        display: 'No of prisoners with religion in SLI',
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

const mockScorecardGroupReligionByEstablishment: DashboardVisualisation = {
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

const mockScorecardGroupNationalityByEstablishment: DashboardVisualisation = {
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

const mockScorecardGroupEthnicityByEstablishment: DashboardVisualisation = {
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
