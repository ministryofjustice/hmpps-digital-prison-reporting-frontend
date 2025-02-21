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
    ],
    measures: [
      {
        id: 'age_range_1',
        display: 'Age range 1',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
    expectNulls: true,
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
    ],
    measures: [
      {
        id: 'age_range_2',
        display: 'Age range 2',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
    expectNulls: true,
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
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const mockListDefinitionTotalPrisoners = {
  id: 'total-prisoners',
  type: 'list',
  display: 'Total prisoners by establishment',
  columns: {
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const mockListDefinitionReligion = {
  id: 'religion',
  type: 'list',
  display: 'Religion totals by wing',
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
        id: 'religion_code',
        display: 'Religion Code',
      },
      {
        id: 'religion_description',
        display: 'Religion description',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionReligionByEst = {
  id: 'religionEst',
  type: 'list',
  display: 'Religion totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
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
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
    expectNulls: true,
  },
}

const mockListDefinitionEthnicity = {
  id: 'ethnicity',
  type: 'list',
  display: 'Ethnicity totals by wing',
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
        id: 'ethnic_code',
        display: 'Ethnic Code',
      },
      {
        id: 'ethnic_description',
        display: 'Ethnic description',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionEthnicityByEst = {
  id: 'ethnicityEst',
  type: 'list',
  display: 'Ethnicity totals by establishment',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
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
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
    expectNulls: true,
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
        id: 'wing',
        display: 'Wing',
      },
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
        id: 'count',
        display: 'Sum',
        aggregate: 'sum',
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
    ],
    measures: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
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
        id: 'count',
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
        id: 'count',
        display: 'Total prisoners',
        aggregate: 'sum',
      },
    ],
  },
}

const mockListDefinitionNationalityByWing = {
  id: 'nationalityByWng',
  type: 'list',
  display: 'Nationality totals by wing',
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
        id: 'nationality_code',
        display: 'Nationality Code',
      },
      {
        id: 'nationality_description',
        display: 'Nationality Description',
      },
      {
        id: 'count',
        display: 'Total prisoners',
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
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

module.exports = {
  mockListDefinitionAgeRange1,
  mockListDefinitionAgeRange2,
  mockListDefinitionTotalPrisoners,
  mockListDefinitionTotalPrisonersByWing,
  mockListDefinitionReligionByEst,
  mockListDefinitionReligion,
  mockListDefinitionEthnicity,
  mockListDefinitionEthnicityByEst,
  mockListDefinitionEthnicityAgeRange,
  mockListDefinitionCell,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionNationality,
  mockListDefinitionNationalityByWing,
}
