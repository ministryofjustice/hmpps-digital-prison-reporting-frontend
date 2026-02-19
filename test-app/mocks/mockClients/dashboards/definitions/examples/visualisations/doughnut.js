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

const dataQualityMetricTwoMetricThreeDoughnut = {
  id: 'doughnut-data-quality-has-MetricTwo-MetricThree',
  type: 'doughnut',
  display: 'MetricTwo & MetricThree values',
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

module.exports = {
  dataQualityMetricOneDoughnut,
  dataQualityMetricTwoDoughnut,
  dataQualityMetricThreeDoughnut,
  dataQualityMetricTwoMetricThreeDoughnut,
}
