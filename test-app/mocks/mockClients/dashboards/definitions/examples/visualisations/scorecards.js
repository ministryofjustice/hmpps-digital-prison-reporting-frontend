// @ts-nocheck
const dietTotals = {
  id: 'sc-diet-totals',
  type: 'scorecard-group',
  display: 'Diet totals',
  description: '',
  columns: {
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishment = {
  id: 'sc-diet-totals-by-establishment',
  type: 'scorecard-group',
  display: 'Diet totals for establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWing = {
  id: 'sc-diet-totals-by-establishment-by-wing',
  type: 'scorecard-group',
  display: 'Diet totals by establishment, by wing',
  description: '',
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
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsFlexible = {
  id: 'sc-diet-totals-by-establishment-by-wing-optional',
  type: 'scorecard-group',
  display: 'Diet totals',
  description: '',
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
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentOptional = {
  id: 'sc-diet-totals-by-establishment-optional',
  type: 'scorecard-group',
  display: 'Diet totals for establishment',
  description: '',
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
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingByCell = {
  id: 'sc-diet-totals-by-establishment-by-wing-by-cell',
  type: 'scorecard-group',
  display: 'Diet totals in Cell 1',
  description: 'Filter rows where cell is equal to "cell-1"',
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
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
    filters: [
      {
        id: 'cell',
        equals: 'cell-1',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellLoop = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-loop',
  type: 'scorecard-group',
  display: 'Diet totals by cell loop',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'wing',
      },
      {
        id: 'cell',
        display: 'Cell',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: '',
      },
      {
        id: 'count',
        displayValue: true,
      },
    ],
  },
}

// Data Quality

const dataQualityAllEstablishmentsMetricOne = {
  id: 'data-quality-MetricOne',
  type: 'scorecard-group',
  display: 'MetricOne score',
  description: '',
  options: {
    useRagColour: true,
    buckets: [{ min: 0, max: 500 }, { min: 501, max: 700 }, { min: 701 }],
  },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'has_metric_one',
        displayValue: true,
      },
    ],
  },
}

const dataQualityAllEstablishmentsNoMetricOne = {
  id: 'data-quality-no-MetricOne',
  type: 'scorecard-group',
  display: 'Missing MetricOne score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'metric_one_is_missing',
        displayValue: true,
      },
    ],
  },
}

const dataQualityAllEstablishmentsMetricThree = {
  id: 'data-quality-MetricThree',
  type: 'scorecard-group',
  display: 'MetricThree score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'has_metric_three',
        displayValue: true,
      },
    ],
  },
}

const dataQualityAllEstablishmentsNoMetricThree = {
  id: 'data-quality-no-MetricThree',
  type: 'scorecard-group',
  display: 'Missing MetricThree score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'metric_three_is_missing',
        displayValue: true,
      },
    ],
  },
}

const dataQualityAllEstablishmentsMetricTwo = {
  id: 'data-quality-MetricTwo',
  type: 'scorecard-group',
  display: 'MetricTwo score',
  description: '',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'has_metric_two',
        displayValue: true,
      },
    ],
  },
}

const dataQualityAllEstablishmentsNoMetricTwo = {
  id: 'data-quality-no-MetricTwo',
  type: 'scorecard-group',
  display: 'Missing MetricTwo score',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'establishment_id',
        display: '',
      },
      {
        id: 'metric_two_is_missing',
        displayValue: true,
      },
    ],
  },
}

const dataQualityAllCols = {
  id: 'data-quality-no-MetricTwo',
  type: 'scorecard-group',
  display: 'Data quality scores',
  description: '',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
      {
        id: 'metric_two_is_missing',
        display: 'MetricTwo is missing',
      },
      {
        id: 'metric_three_is_missing',
        display: 'MetricThree is missing',
      },
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
      {
        id: 'metric_one_is_missing',
        display: 'MetricOne is missing',
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
    ],
  },
}

const dataQualityAllColsList = {
  id: 'data-quality-no-MetricTwo',
  type: 'list',
  display: 'Missing MetricTwo score',
  description: '',
  cols: true,
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'has_metric_two',
        display: 'has_metric_two',
      },
      {
        id: 'metric_two_is_missing',
        display: 'metric_two_is_missing',
      },
      {
        id: 'metric_three_is_missing',
        display: 'metric_three_is_missing',
      },
      {
        id: 'has_metric_three',
        display: 'has_metric_three',
      },
      {
        id: 'metric_one_is_missing',
        display: 'metric_one_is_missing',
      },
      {
        id: 'has_metric_one',
        display: 'has_metric_one',
      },
    ],
  },
}

const scorecards = {
  dietTotals,
  dietTotalsByEstablishment,
  dietTotalsByEstablishmentByWing,
  dietTotalsByEstablishmentOptional,
  dietTotalsFlexible,
  dietTotalsByEstablishmentByWingByCell,
  dietTotalsByEstablishmentByWingByCellLoop,
  dataQualityAllEstablishmentsMetricOne,
  dataQualityAllEstablishmentsNoMetricOne,
  dataQualityAllEstablishmentsMetricThree,
  dataQualityAllEstablishmentsNoMetricThree,
  dataQualityAllEstablishmentsMetricTwo,
  dataQualityAllEstablishmentsNoMetricTwo,
  dataQualityAllCols,
  dataQualityAllColsList,
}

module.exports = scorecards
