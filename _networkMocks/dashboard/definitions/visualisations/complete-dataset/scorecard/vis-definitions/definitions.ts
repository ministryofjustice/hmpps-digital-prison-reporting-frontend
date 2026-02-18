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
