const mockListDefinitionAgeRange1 = {
  id: 'age-range-1',
  name: 'Age Range 1',
  display: 'Age Range 1',
  description: 'Age Range 1',
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
    dimensions: [
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
  name: 'Age Range 2',
  display: 'Age Range 2',
  description: 'Age Range 2',
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
    dimensions: [
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
  name: 'Total prisoners by wing',
  display: 'Total prisoners by wing',
  description: 'Total prisoners by wing',
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
    dimensions: [
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
  name: 'Total prisoners',
  display: 'Total prisoners',
  description: 'Total prisoners',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    dimensions: [
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
  name: 'Religion',
  display: 'Religion',
  description: 'Religion',
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
    dimensions: [
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
  name: 'Ethnicity',
  display: 'Ethnicity',
  description: 'Ethnicity',
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
    dimensions: [
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
  },
}

const mockListDefinitionCell = {
  id: 'cell-total',
  name: 'Cell total',
  display: 'Cell total',
  description: 'Cell total',
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
    dimensions: [
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
  id: 'age-range-1-wint',
  name: 'Age Range 1 by wing',
  display: 'Age Range 1 by wing',
  description: 'Age Range 1 by wing',
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
    dimensions: [
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
  name: 'Age Range 2 by wing',
  display: 'Age Range 2 by wing',
  description: 'Age Range 2 by wing',
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
    dimensions: [
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
  id: 'age-range-2',
  name: 'Age Range 2 by wing',
  display: 'Age Range 2 by wing',
  description: 'Age Range 2 by wing',
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
    dimensions: [
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
        aggregate: 'sum',
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
  mockListDefinitionCell,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionNationality,
}
