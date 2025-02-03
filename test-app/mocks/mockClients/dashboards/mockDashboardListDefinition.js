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

module.exports = {
  mockListDefinitionAgeRange1,
  mockListDefinitionAgeRange2,
  mockListDefinitionTotalPrisoners,
  mockListDefinitionTotalPrisonersByWing,
}
