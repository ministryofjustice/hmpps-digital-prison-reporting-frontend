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
    ],
    values: [
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
    ],
    values: [
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
}
