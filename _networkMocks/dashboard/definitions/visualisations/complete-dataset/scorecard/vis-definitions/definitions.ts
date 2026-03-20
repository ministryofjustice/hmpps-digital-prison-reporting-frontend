import { UnitType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/Validate'
import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const simpleScorecardMetricTwo: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricTwo',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricTwo',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricTwoWithUnit: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricTwo-with-uint',
  type: DashboardVisualisationType.SCORECARD,
  display: 'Percentage of prisoners with MetricTwo',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two', unit: UnitType.PERCENTAGE }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricTwoFilter: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricTwo',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricTwo',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
    filters: [
      {
        id: 'establishment_id',
        equals: 'GHI',
      },
    ],
    expectNulls: false,
  },
}

export const simpleScorecardMetricThree: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricThree',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricThree',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricThreeWithUnit: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricThreeWithUnit',
  type: DashboardVisualisationType.SCORECARD,
  display: 'Percentage of prisoners with MetricThree',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three', unit: UnitType.PERCENTAGE }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricOne: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricOne',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricOne',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricOneTrendDown: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricOne-trend-down',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricOne',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
    filters: [{ id: 'establishment_id', equals: 'GHI' }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricOneWithUnit: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricOneWithUnit',
  type: DashboardVisualisationType.SCORECARD,
  display: 'Percentage of prisoners with MetricOne',
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one', unit: UnitType.PERCENTAGE }],
    expectNulls: false,
  },
}

export const simpleScorecardRagColoursMetricTwo: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-MetricTwo',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricTwo',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_two' }],
    expectNulls: false,
  },
}

export const simpleScorecardRagColoursMetricThree: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-MetricThree',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricThree',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_three' }],
    expectNulls: false,
  },
}

export const simpleScorecardRagColoursMetricOne: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-rag-MetricOne',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricOne',
  options: {
    useRagColour: true,
  },
  columns: {
    keys: [{ id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }],
    expectNulls: false,
  },
}
