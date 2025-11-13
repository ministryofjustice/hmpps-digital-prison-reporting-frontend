// @ts-nocheck
const mockScorecardDefinitionNationality = {
  type: 'scorecard',
  options: {
    buckets: [{ hexColour: '#f47738' }, { hexColour: '#f499be' }, { hexColour: '#d53880' }],
  },
  columns: {
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

const mockScorecardDefinitionNoNationality = {
  type: 'scorecard',
  columns: {
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

const mockScorecardDefinitionReligion = {
  type: 'scorecard',
  columns: {
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

const mockTargetScorecardDefinitionReligion = {
  type: 'scorecard',
  columns: {
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

const mockScorecardGroupReligionByEstablishment = {
  id: 'religion-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has religion by Establishment',
  columns: {
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

const mockScorecardGroupNationalityByEstablishment = {
  id: 'nationality-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has nationality by Establishment',
  columns: {
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

const mockScorecardGroupEthnicityByEstablishment = {
  id: 'ethnicity-by-est-sc-group',
  type: 'scorecard-group',
  display: 'Has ethnicity by Establishment',
  columns: {
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

module.exports = {
  mockScorecardDefinitionNationality,
  mockScorecardDefinitionNoNationality,
  mockScorecardDefinitionReligion,
  mockScorecardGroupReligionByEstablishment,
  mockScorecardGroupNationalityByEstablishment,
  mockScorecardGroupEthnicityByEstablishment,
  mockTargetScorecardDefinitionReligion,
}
