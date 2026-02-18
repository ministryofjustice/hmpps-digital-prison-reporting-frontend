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

const dataQualityReligionBar = {
  id: 'bar-data-quality-has-religion',
  type: 'bar',
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
        display: 'Has religion',
      },
      {
        id: 'metric_three_is_missing',
        display: 'No religion',
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
  dataQualityReligionBar,
  dataQualityMetricTwoBar,
  dataQualityAllBar,
  dataQualityListBar,
}
