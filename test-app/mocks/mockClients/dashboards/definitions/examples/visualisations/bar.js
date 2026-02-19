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

const dataQualityAllBar = {
  id: 'bar-data-quality-all',
  type: 'bar',
  display: 'All metrics together',
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

const dataQualityListBar = {
  id: 'bar-data-quality-list',
  type: 'bar',
  display: 'Has MetricTwo by establishment',
  columns: {
    keys: [],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        axis: 'x',
      },
      {
        id: 'has_metric_two',
        display: 'Has MetricTwo',
        axis: 'y',
      },
    ],
  },
}

module.exports = {
  dataQualityMetricOneBar,
  dataQualityMetricThreeBar,
  dataQualityMetricTwoBar,
  dataQualityAllBar,
  dataQualityListBar,
}
