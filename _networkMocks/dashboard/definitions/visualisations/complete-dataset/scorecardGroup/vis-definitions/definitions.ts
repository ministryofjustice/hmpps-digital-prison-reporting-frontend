import { UnitType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/Validate'
import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dataQualityAllEstablishmentsMetricOne: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-MetricOne',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNoMetricOne: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-no-MetricOne',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsMetricThree: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-MetricThree',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNoMetricThree: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-no-MetricThree',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsMetricTwo: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-MetricTwo',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllEstablishmentsNoMetricTwo: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-no-MetricTwo',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllCols: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-columns-as-cards',
  type: DashboardVisualisationType.SCORECARD_GROUP,
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
    expectNulls: false,
  },
}

export const dataQualityAllColsWithUnits: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'data-quality-columns-as-cards-with-unit',
  type: DashboardVisualisationType.SCORECARD_GROUP,
  display: 'Data quality scorecards',
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
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'metric_two_is_missing',
        display: 'MetricTwo is missing',
        unit: UnitType.PERCENTAGE,
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
        unit: UnitType.PERCENTAGE,
      },
      {
        id: 'has_metric_one',
        display: 'Has MetricOne',
        unit: UnitType.PERCENTAGE,
      },
    ],
    expectNulls: false,
  },
}
