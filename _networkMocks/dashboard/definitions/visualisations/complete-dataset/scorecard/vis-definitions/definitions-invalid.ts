import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const simpleScorecardMetricOneInvalid: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricOne',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricOne',
  description: 'Invalid definition - too many measures - should only have one measure',
  columns: {
    keys: [{ id: 'ts', type: 'timestamp' }, { id: 'establishment_id' }],
    measures: [{ id: 'has_metric_one' }, { id: 'has_metric_one' }],
    expectNulls: false,
  },
}

export const simpleScorecardMetricTwoInvalid: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricTwo',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricTwo',
  description: 'Invalid definition - not enough measures - should only have one measure',
  columns: {
    keys: [{ id: 'ts', type: 'timestamp' }, { id: 'establishment_id' }],
    measures: [],
    expectNulls: false,
  },
}

export const simpleScorecardMetricThreeInvalid: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'simple-scorecard-MetricThree',
  type: DashboardVisualisationType.SCORECARD,
  display: 'No of prisoners with MetricThree',
  description: 'Invalid definition - No keys - should only have min one key',
  columns: {
    keys: [],
    measures: [{ id: 'has_metric_three' }],
    expectNulls: false,
  },
}
