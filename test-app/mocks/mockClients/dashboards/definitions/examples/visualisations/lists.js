// @ts-nocheck
const explicitKeys = {
  id: 'explicit-keys',
  type: 'list',
  display: 'Explicit keys',
  description: 'Filter dataset where ALL keys have values present. Otherwise no rows are returned',
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

const optionalKey = {
  id: 'optional-key',
  type: 'list',
  display: 'Optional key',
  description: 'Filtering cascades to return rows with with values for mandatory keys. Otherwise no rows are returned',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
      },
      {
        id: 'wing',
        display: 'Wing',
        optional: true,
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

const allOptional = {
  id: 'all-optional',
  type: 'list',
  display: 'All keys are optional',
  description: 'Filtering cascades to return rows where all key values are null',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishmnent ID',
        optional: true,
      },
      {
        id: 'wing',
        display: 'Wing',
        optional: true,
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

const dietTotals = {
  id: 'diet-totals',
  type: 'list',
  display: 'Diet totals',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsWithFilters = {
  id: 'diet-totals-with-filters',
  type: 'list',
  display: 'Diet totals filter on DietOne',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsWithFiltersSingleColumn = {
  id: 'diet-totals-single-column',
  type: 'list',
  display: 'Diet totals single column',
  description: '',
  columns: {
    keys: [
      {
        id: 'diet',
        display: 'Diet',
      },
    ],
    measures: [
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
      {
        id: 'diet',
        equals: 'DietTwo',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishment = {
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentOptional = {
  id: 'diet-totals-by-establishment-optional',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWing = {
  id: 'diet-totals-by-establishment-by-wing',
  type: 'list',
  display: 'Diet totals by establishment, by wing',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingByCell = {
  id: 'diet-totals-by-establishment-by-wing-by-cell',
  type: 'list',
  display: 'Diet totals by cell',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellFilters = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-filters',
  type: 'list',
  display: 'Diet totals by cell',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'cell',
        display: 'Cell',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'cell',
        display: 'Cell-1',
      },
      {
        id: 'cell',
        display: 'Cell-2',
      },
      {
        id: 'diet',
        display: 'DietOne',
      },
      {
        id: 'diet',
        display: 'DietFour',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingOptional = {
  id: 'diet-totals-by-establishment-by-wing-optional',
  type: 'list',
  display: 'Diet totals by establishment, by wing',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
      {
        id: 'wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsOverTime = {
  id: 'diet-totals-over-time',
  type: 'list',
  display: 'Prisoner totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentOverTime = {
  id: 'diet-totals-by-est-over-time',
  type: 'list',
  display: 'Prsioner totals by establishment over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOverTime = {
  id: 'diet-totals-by-est-by-wing-over-time',
  type: 'list',
  display: 'Prisoner totals by establishment, by wing, over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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

const dietTotalsByEstablishmentByWingOverTimeOptional = {
  id: 'diet-totals-by-est-by-wing-over-time-optional',
  type: 'list',
  display: 'Diet totals by Establishment, by wing, over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        optional: true,
      },
      {
        id: 'wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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

const dietTotalsDietOneOvertime = {
  id: 'diet-totals-DietOne-overtime',
  type: 'list',
  display: 'DietOne totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDietOneOvertimeByEst = {
  id: 'diet-totals-DietOne-overtime-by-est',
  type: 'list',
  display: 'DietOne totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDietOneOvertimeByEstByWing = {
  id: 'diet-totals-DietOne-overtime-by-est-by-wing',
  type: 'list',
  display: 'DietOne totals over time by wing',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDietOneOvertimeByEstByWingOptional = {
  id: 'diet-totals-DietOne-overtime-by-est-by-wing-optional',
  type: 'list',
  display: 'DietOne totals over time by wing - Optional',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        optional: true,
      },
      {
        id: 'wing',
        display: 'Wing',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDietThreeOvertime = {
  id: 'diet-totals-DietOne-overtime',
  type: 'list',
  display: 'DietThree totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietThree',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsAllDietOvertime = {
  id: 'diet-totals-DietOne-overtime',
  type: 'list',
  display: 'All Diet totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsAllDietOvertimeByEst = {
  id: 'diet-totals-all-diet-overtime-by-est',
  type: 'list',
  display: 'All Diet totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const fullDataset = {
  id: 'allData',
  type: 'list',
  display: 'All Data in dataset',
  options: {
    showLatest: false,
  },
  columns: {
    measures: [],
    expectNulls: false,
  },
}

const fullDatasetOverTime = {
  id: 'allData',
  type: 'list',
  display: 'All Data in dataset',
  columns: {},
  options: { showLatest: false },
}

const dataQualityMetricOne = {
  id: 'list-data-quality-has-MetricOne',
  type: 'list',
  display: 'MetricOne Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
      },
    ],
  },
}

const dataQualityColsToList = {
  id: 'list-data-quality-has-MetricOne',
  type: 'list',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
      },
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
      },
    ],
    expectNulls: false,
  },
  options: { columnsAsList: true },
}

const dataQualityReligion = {
  id: 'list-data-quality-has-religion',
  type: 'list',
  display: 'Religion Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
    ],
  },
}

const dataQualityMetricTwo = {
  id: 'list-data-quality-has-MetricTwo',
  type: 'list',
  display: 'MetricTwo Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
      },
    ],
  },
}

const dataQualityMetricOneHistoric = {
  id: 'list-data-quality-has-MetricOne-historic',
  type: 'list',
  display: 'MetricOne Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityReligionHistoric = {
  id: 'list-data-quality-has-religion-historic',
  type: 'list',
  display: 'Religion Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_three',
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityMetricTwoHistoric = {
  id: 'list-data-quality-has-MetricTwo-historic',
  type: 'list',
  display: 'MetricTwo Values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
      },
    ],
  },
  options: { showLatest: false },
}

const lists = {
  explicitKeys,
  optionalKey,
  allOptional,
  dietTotals,
  dietTotalsWithFilters,
  dietTotalsWithFiltersSingleColumn,
  dietTotalsByEstablishment,
  dietTotalsByEstablishmentByWing,
  dietTotalsByEstablishmentByWingByCell,
  dietTotalsByEstablishmentByWingOptional,
  dietTotalsByEstablishmentOptional,
  dietTotalsOverTime,
  dietTotalsByEstablishmentOverTime,
  dietTotalsByEstablishmentByWingOverTime,
  dietTotalsByEstablishmentByWingOverTimeOptional,
  dietTotalsDietOneOvertime,
  dietTotalsDietThreeOvertime,
  dietTotalsAllDietOvertime,
  dietTotalsAllDietOvertimeByEst,
  dietTotalsDietOneOvertimeByEst,
  dietTotalsDietOneOvertimeByEstByWing,
  dietTotalsDietOneOvertimeByEstByWingOptional,
  fullDataset,
  fullDatasetOverTime,
  dataQualityMetricOne,
  dataQualityReligion,
  dataQualityMetricTwo,
  dataQualityMetricOneHistoric,
  dataQualityReligionHistoric,
  dataQualityMetricTwoHistoric,
  dataQualityColsToList,
}

module.exports = lists
