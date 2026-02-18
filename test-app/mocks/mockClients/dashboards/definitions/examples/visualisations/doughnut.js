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

const dataQualityReligionDoughnut = {
  id: 'doughnut-data-quality-has-religion',
  type: 'doughnut',
  display: 'Religion values',
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
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
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

const dataQualityMetricTwoReligionDoughnut = {
  id: 'doughnut-data-quality-has-MetricTwo-religion',
  type: 'doughnut',
  display: 'MetricTwo & Religion values',
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
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
      },
    ],
  },
}

module.exports = {
  dataQualityMetricOneDoughnut,
  dataQualityMetricTwoDoughnut,
  dataQualityReligionDoughnut,
  dataQualityMetricTwoReligionDoughnut,
}
