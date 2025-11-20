// @ts-nocheck
const mockScorecardDefinitionNationality = {
  type: 'scorecard',
  display: 'No of prisoners with nationality',
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
      },
    ],
  },
}

const mockScorecardDefinitionNoNationality = {
  type: 'scorecard',
  display: 'No of prisoners with no nationality',
  columns: {
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

const mockScorecardDefinitionReligion = {
  type: 'scorecard',
  display: 'No of prisoners with nationality',
  columns: {
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

const mockTargetScorecardDefinitionReligion = {
  type: 'scorecard',
  display: 'No of prisoners with religion in SLI',
  columns: {
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
