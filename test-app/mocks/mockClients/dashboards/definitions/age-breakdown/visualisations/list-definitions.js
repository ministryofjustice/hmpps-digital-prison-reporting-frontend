// @ts-nocheck
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

const mockListDefinitionMetricOne = {
  id: 'MetricOne',
  type: 'list',
  display: 'MetricOne totals by wing',
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

const mockListDefinitionMetricOneByEst = {
  id: 'MetricOneEst',
  type: 'list',
  display: 'MetricOne totals by establishment',
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

const mockListDefinitionMetricOneAgeRange = {
  id: 'MetricOne',
  type: 'list',
  display: 'MetricOne totals by age range',
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

const mockListDefinitionMetricTwoByWing = {
  id: 'MetricTwoByWng',
  type: 'list',
  display: 'MetricTwo totals by wing',
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
        id: 'MetricTwo_code',
        display: 'MetricTwo Code',
      },
      {
        id: 'MetricTwo_description',
        display: 'MetricTwo Description',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
  },
}

const mockListDefinitionMetricTwo = {
  id: 'MetricTwo',
  type: 'list',
  display: 'MetricTwo totals',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
    ],
    measures: [
      {
        id: 'MetricTwo_code',
        display: 'MetricTwo Code',
      },
      {
        id: 'MetricTwo_description',
        display: 'MetricTwo Description',
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
  mockListDefinitionMetricOne,
  mockListDefinitionMetricOneByEst,
  mockListDefinitionMetricOneAgeRange,
  mockListDefinitionCell,
  mockListDefinitionAgeRange1Wing,
  mockListDefinitionAgeRange2Wing,
  mockListDefinitionMetricTwo,
  mockListDefinitionMetricTwoByWing,
}
