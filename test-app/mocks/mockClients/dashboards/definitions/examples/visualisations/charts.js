// @ts-nocheck
// DIET TOTALS

const dietTotalsBar = {
  id: 'bar-diet-totals',
  type: 'bar',
  display: 'Diet totals as bar chart',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDoughnut = {
  id: 'bar-diet-totals',
  type: 'doughnut',
  display: 'Diet totals as doughnut chart',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentBar = {
  id: 'diet-totals-by-establishment-bar',
  type: 'bar',
  display: 'Diet totals by establishment',
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
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentDoughnut = {
  ...dietTotalsByEstablishmentBar,
  id: 'diet-totals-by-establishment-doughnut',
  type: 'doughnut',
}

const dietTotalsByEstablishmentByWingBar = {
  id: 'diet-totals-by-establishment',
  type: 'bar',
  display: 'Diet totals by establishment',
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
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingDoughnut = {
  ...dietTotalsByEstablishmentByWingBar,
  id: 'diet-totals-by-establishment-and-wing-doughnut',
  type: 'doughnut',
}

const dietTotalsByEstablishmentByWingOptionalBar = {
  id: 'diet-totals-by-establishment-by-wing-optional-bar',
  type: 'bar',
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
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOptionalDoughnut = {
  ...dietTotalsByEstablishmentByWingOptionalBar,
  id: 'diet-totals-by-establishment-and-wing-doughnut-optional',
  type: 'doughnut',
}

const dietTotalsByEstablishmentByWingByCellBar = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-bar',
  type: 'bar',
  display: 'Diet totals by cell bar',
  description: '',
  options: {
    horizontal: true,
  },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
      },
      {
        id: 'cell',
        display: 'Cell',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingBarOptional = {
  id: 'diet-totals-by-establishment-by-wing-by-bar-optional',
  type: 'bar',
  display: '',
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
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingByCellBarOptional = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-bar-optional',
  type: 'bar',
  display: '',
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
      {
        id: 'cell',
        display: 'Cell',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
  },
}

const dietTotalsByEstablishmentByWingByCellPieOptional = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-pie-optional',
  type: 'doughnut',
  display: 'Flexible Diet totals Pie chart',
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
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsOverTime = {
  id: 'chart-diet-totals-over-time',
  type: 'line-timeseries',
  display: 'Prisoner totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
      },
    ],
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
  id: 'chart-diet-totals-by-est-over-time',
  type: 'line-timeseries',
  display: 'Prisoner totals by establishment over time',
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
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOverTime = {
  id: 'line-diet-totals-by-est-by-wing-over-time',
  type: 'line-timeseries',
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
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDietOneOvertime = {
  id: 'diet-totals-DietOne-overtime',
  type: 'line-timeseries',
  display: 'DietOne totals over time line chart',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
      },
    ],
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
  type: 'line-timeseries',
  display: 'DietThree totals over time line chart',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
      },
    ],
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
    filters: [
      {
        id: 'diet',
        equals: 'DietThree',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsDietOneOvertimeByEstLine = {
  id: 'line-diet-totals-DietOne-overtime-by-est',
  type: 'line-timeseries',
  display: 'DietOne totals over time line',
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

const dietTotalsDietOneOvertimeByEstByWingLine = {
  id: 'line-diet-totals-DietOne-overtime-by-est-by-wing',
  type: 'line-timeseries',
  display: 'DietOne totals over time by wing line',
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

const dietTotalsAllDietOvertimeByEstLine = {
  id: 'line-diet-totals-all-diet-overtime-by-est',
  type: 'line-timeseries',
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
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

const dietTotalsByEstablishmentByWingOverTimeOptionalLine = {
  id: 'line-diet-totals-by-est-by-wing-over-time-optional',
  type: 'line-timeseries',
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
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

// DATA QUALITY

// BAR

const dataQualityMetricOneBar = {
  id: 'bar-data-quality-has-MetricOne',
  type: 'bar',
  display: 'MetricOne values',
  options: {
    horizontal: true,
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

const dataQualityMetricThreeBar = {
  id: 'bar-data-quality-has-MetricThree',
  type: 'bar',
  display: 'MetricThree values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
      },
    ],
  },
}

const dataQualityMetricTwoBar = {
  id: 'bar-data-quality-has-MetricTwo',
  type: 'bar',
  display: 'MetricTwo values',
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
        display: 'No MetricTwo',
      },
    ],
  },
}

// DOUGHNUT

const dataQualityMetricOneDoughnut = {
  id: 'doughnut-data-quality-has-MetricOne',
  type: 'doughnut',
  display: 'MetricOne values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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
    ],
  },
}

const dataQualityMetricThreeDoughnut = {
  id: 'doughnut-data-quality-has-MetricThree',
  type: 'doughnut',
  display: 'MetricThree values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
      },
    ],
  },
}

const dataQualityMetricTwoDoughnut = {
  id: 'doughnut-data-quality-has-MetricTwo',
  type: 'doughnut',
  display: 'MetricTwo values',
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
        display: 'No MetricTwo',
      },
    ],
  },
}

// BAR

const dataQualityMetricOneLine = {
  id: 'line-data-quality-has-MetricOne',
  type: 'line',
  display: 'MetricOne values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
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
    ],
  },
}

const dataQualityMetricThreeLine = {
  id: 'line-data-quality-has-MetricThree',
  type: 'line',
  display: 'MetricThree values',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
      },
    ],
  },
}

const dataQualityMetricTwoLine = {
  id: 'line-data-quality-has-MetricTwo',
  type: 'line',
  display: 'MetricTwo values',
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
        display: 'No MetricTwo',
      },
    ],
  },
}

// HISTORIC LINE

const dataQualityMetricOneHistoricLine = {
  id: 'line-data-quality-has-MetricOne-historic',
  type: 'line-timeseries',
  display: 'MetricOne values',
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
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityMetricThreeHistoricLine = {
  id: 'line-data-quality-has-MetricThree-historic',
  type: 'line-timeseries',
  display: 'MetricThree values',
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
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityMetricTwoHistoricLine = {
  id: 'line-data-quality-has-MetricTwo-historic',
  type: 'line-timeseries',
  display: 'MetricTwo values',
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
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityMetricOneHistoricBar = {
  id: 'line-data-quality-has-MetricOne-historic',
  type: 'bar-timeseries',
  display: 'MetricOne values',
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
        id: 'has_metric_one',
        display: 'Has MetricOne',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityMetricThreeHistoricBar = {
  id: 'line-data-quality-has-MetricThree-historic',
  type: 'bar-timeseries',
  display: 'MetricThree values',
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
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
    ],
  },
  options: { showLatest: false },
}

const dataQualityMetricTwoHistoricBar = {
  id: 'line-data-quality-has-MetricTwo-historic',
  type: 'bar-timeseries',
  display: 'MetricTwo values',
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
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
  },
  options: { showLatest: false },
}

const charts = {
  dietTotalsBar,
  dietTotalsDoughnut,
  dietTotalsByEstablishmentBar,
  dietTotalsByEstablishmentDoughnut,
  dietTotalsByEstablishmentByWingBar,
  dietTotalsByEstablishmentByWingDoughnut,
  dietTotalsByEstablishmentByWingOptionalBar,
  dietTotalsByEstablishmentByWingOptionalDoughnut,
  dietTotalsByEstablishmentByWingByCellBar,
  dietTotalsByEstablishmentByWingByCellBarOptional,
  dietTotalsByEstablishmentByWingBarOptional,
  dietTotalsByEstablishmentByWingByCellPieOptional,
  dietTotalsOverTime,
  dietTotalsByEstablishmentOverTime,
  dietTotalsByEstablishmentByWingOverTime,
  dietTotalsDietOneOvertime,
  dietTotalsDietThreeOvertime,
  dietTotalsAllDietOvertimeByEstLine,
  dietTotalsDietOneOvertimeByEstLine,
  dietTotalsDietOneOvertimeByEstByWingLine,
  dietTotalsByEstablishmentByWingOverTimeOptionalLine,
  dataQualityMetricOneBar,
  dataQualityMetricThreeBar,
  dataQualityMetricTwoBar,
  dataQualityMetricOneDoughnut,
  dataQualityMetricThreeDoughnut,
  dataQualityMetricTwoDoughnut,
  dataQualityMetricOneLine,
  dataQualityMetricThreeLine,
  dataQualityMetricTwoLine,
  dataQualityMetricOneHistoricLine,
  dataQualityMetricThreeHistoricLine,
  dataQualityMetricTwoHistoricLine,
  dataQualityMetricOneHistoricBar,
  dataQualityMetricThreeHistoricBar,
  dataQualityMetricTwoHistoricBar,
}

module.exports = charts
