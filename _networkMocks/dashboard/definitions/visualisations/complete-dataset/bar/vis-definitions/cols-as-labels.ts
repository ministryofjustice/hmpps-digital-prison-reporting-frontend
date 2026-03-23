import { UnitType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/Validate'
import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityMetricOneBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-has-MetricOne',
  type: DashboardVisualisationType.BAR,
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
    expectNulls: false,
  },
}

export const dataQualityMetricOneBarHorizontal: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-has-MetricOne-horizontal',
  type: DashboardVisualisationType.BAR,
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
    expectNulls: false,
  },
}

export const dataQualityMetricThreeBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-has-MetricThree',
  type: DashboardVisualisationType.BAR,
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
    expectNulls: false,
  },
}

export const dataQualityMetricTwoBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-has-MetricTwo',
  type: DashboardVisualisationType.BAR,
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
    expectNulls: false,
  },
}

export const dataQualityAllBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-all',
  type: DashboardVisualisationType.BAR,
  display: 'All metrics together',
  options: {
    horizontal: false,
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
    expectNulls: false,
  },
}

export const dataQualityAllBarHorizontal: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-all-horizontal',
  type: DashboardVisualisationType.BAR,
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
    expectNulls: false,
  },
}

export const dataQualityAllBarWithUnit: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-all-with-unit',
  type: DashboardVisualisationType.BAR,
  display: 'All metrics together with unit',
  options: {
    horizontal: false,
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
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
        unit: UnitType.PERCENTAGE,
      },
    ],
    expectNulls: false,
  },
}

export const dataQualityAllBarWithUnitHorizontal: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-data-quality-all-with-unit-horizontal',
  type: DashboardVisualisationType.BAR,
  display: 'All metrics together horizontal with unit',
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
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'has_metric_three',
        display: 'Has MetricThree',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_three_is_missing',
        display: 'No MetricThree',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
        unit: UnitType.PERCENTAGE,
      },
    ],
    expectNulls: false,
  },
}
