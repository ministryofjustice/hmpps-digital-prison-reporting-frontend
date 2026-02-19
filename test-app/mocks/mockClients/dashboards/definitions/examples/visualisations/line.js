const dataQualityLine = {
  id: 'line-data-quality',
  type: 'line',
  display: 'All metrics values',
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
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
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

module.exports = {
  dataQualityLine,
  dataQualityMetricThreeLine,
  dataQualityMetricTwoLine,
}
