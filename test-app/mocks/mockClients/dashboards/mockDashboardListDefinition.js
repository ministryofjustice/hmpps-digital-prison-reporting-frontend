const mockListDefinitionAgeRange1 = {
  id: 'age-range-1',
  name: 'Total prisoners by age range 1',
  display: 'Total prisoners by age range 1',
  description: 'Total prisoners by age range 1',
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
  name: 'Total prisoners by age range 2',
  display: 'Total prisoners by age range 2',
  description: 'Total prisoners by age range 2',
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
  name: 'Total prisoners by establishment',
  display: 'Total prisoners by establishment',
  description: 'Total prisoners by establishment',
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
  name: 'Religion totals',
  display: 'Religion totals',
  description: 'Religion totals',
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
  name: 'Ethnicity totals',
  display: 'Ethnicity totals',
  description: 'Ethnicity totals',
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
  name: 'Cell totals',
  display: 'Cell totals',
  description: 'Cell totals',
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
  name: 'Age range 1 by wing totals',
  display: 'Age range 1 by wing totals',
  description: 'Age range 1 by wing totals',
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
  name: 'Age range 2 by wing totals',
  display: 'Age range by wing totals',
  description: 'Age range by wing totals',
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
  id: 'nationality',
  name: 'Nationality totals',
  display: 'Nationality totals',
  description: 'Nationality totals',
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
