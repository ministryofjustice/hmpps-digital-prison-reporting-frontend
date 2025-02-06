const mockListDefinitionAgeRange1 = {
  id: 'age-range-1',
  type: 'list',
  display: 'Total prisoners by age range 1',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'age_range_1',
        display: 'Age range 1',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionAgeRange2 = {
  id: 'age-range-2',
  type: 'list',
  display: 'Total prisoners by age range 2',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'age_range_2',
        display: 'Age range 2',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionTotalPrisonersByWing = {
  id: 'total-prisoners',
  type: 'list',
  display: 'Total prisoners by wing',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
      },
    ],
  },
}

const mockListDefinitionTotalPrisoners = {
  id: 'total-prisoners',
  type: 'list',
  display: 'Total prisoners by establishment',
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
        display: 'Establishmnent ID',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
      },
    ],
  },
}

const mockListDefinitionReligion = {
  id: 'religion',
  type: 'list',
  display: 'Religion totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'religion_code',
        display: 'Religion Code',
      },
      {
        id: 'religion_description',
        display: 'Religion description',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionEthnicity = {
  id: 'ethnicity',
  type: 'list',
  display: 'Ethnicity totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'ethnic_code',
        display: 'Ethnic Code',
      },
      {
        id: 'ethnic_description',
        display: 'Ethnic description',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
    ignore: [
      { id: 'age_range_1_18_25' },
      { id: 'age_range_1_26_34' },
      { id: 'age_range_1_35_44' },
      { id: 'age_range_1_45_54' },
      { id: 'age_range_1_55_64' },
    ],
  },
}

const mockListDefinitionEthnicityAgeRange = {
  id: 'ethnicity',
  type: 'list',
  display: 'Ethnicity totals by age range',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'ethnic_description',
        display: 'Ethnic description',
      },
      {
        id: 'age_range_1_18_25',
        display: '18-25',
        aggregate: 'sum',
      },
      {
        id: 'age_range_1_26_34',
        display: '26-34',
        aggregate: 'sum',
      },
      {
        id: 'age_range_1_35_44',
        display: '26-34',
        aggregate: 'sum',
      },
      {
        id: 'age_range_1_45_54',
        display: '26-34',
        aggregate: 'sum',
      },
      {
        id: 'age_range_1_55_64',
        display: '26-34',
        aggregate: 'sum',
      },
      {
        id: 'total_prisoners',
        display: 'Sum',
        aggregate: 'sum',
      },
    ],
    ignore: [
      {
        id: 'ethnic_code',
      },
    ],
  },
}

const mockListDefinitionCell = {
  id: 'cell-total',
  type: 'list',
  display: 'Cell totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
      },
    ],
  },
}

const mockListDefinitionAgeRange1Wing = {
  id: 'age-range-1-wing',
  type: 'list',
  display: 'Age range 1 by wing totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'age_range_1',
        display: 'Age range 1',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionAgeRange2Wing = {
  id: 'age-range-2',
  type: 'list',
  display: 'Age range by wing totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'age_range_2',
        display: 'Age range 2',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionNationality = {
  id: 'nationality',
  type: 'list',
  display: 'Nationality totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'nationality_code',
        display: 'Nationality Code',
      },
      {
        id: 'nationality_description',
        display: 'Nationality Description',
      },
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
      },
    ],
  },
}

const mockScorecardDefinitionTotalInWing = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'total_prisoners',
        display: 'Total prisoners in wing',
      },
    ],
  },
}

const mockScorecardDefinitionTotalInEst = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'total_prisoners',
        display: 'Total prisoners',
      },
    ],
  },
}

const mockScorecardDefinitionEthnicWhite = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'total_prisoners',
        display: 'Total prisoners whose ethnic description is White: Eng./Welsh/Scot./N.Irish/British',
      },
    ],
    values: [
      {
        id: 'ethnic_code',
        equals: 'W2',
      },
    ],
    ignore: [
      { id: 'ethnic_description' },
      { id: 'age_range_1_18_25' },
      { id: 'age_range_1_26_34' },
      { id: 'age_range_1_35_44' },
      { id: 'age_range_1_45_54' },
      { id: 'age_range_1_55_64' },
    ],
  },
}

const mockScorecardDefinitionEthnicAsian = {
  type: 'scorecard',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'total_prisoners',
        display: 'Total prisoners whose ethnic description is Asian/Asian British: Pakistani',
      },
    ],
    values: [
      {
        id: 'ethnic_code',
        equals: 'A2',
      },
    ],
    ignore: [
      { id: 'ethnic_description' },
      { id: 'age_range_1_18_25' },
      { id: 'age_range_1_26_34' },
      { id: 'age_range_1_35_44' },
      { id: 'age_range_1_45_54' },
      { id: 'age_range_1_55_64' },
    ],
  },
}

const mockScoreCardGroupReligion = {
  type: 'scorecard-group',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'religion_code',
      },
      {
        id: 'religion_description',
        display: 'Total prisoners whose religion description is',
      },
      {
        id: 'total_prisoners',
        displayValue: true,
      },
    ],
  },
}

module.exports = {
  mockListDefinitionAgeRange1,
  mockListDefinitionAgeRange2,
  mockListDefinitionTotalPrisoners,
  mockListDefinitionTotalPrisonersByWing,
  mockListDefinitionReligion,
  mockListDefinitionEthnicity,
  mockListDefinitionEthnicityAgeRange,
  mockListDefinitionCell,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionNationality,
  mockScorecardDefinitionTotalInWing,
  mockScorecardDefinitionTotalInEst,
  mockScorecardDefinitionEthnicWhite,
  mockScorecardDefinitionEthnicAsian,
  mockScoreCardGroupReligion,
}
