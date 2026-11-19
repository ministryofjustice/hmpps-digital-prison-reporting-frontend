import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const lineChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-chart-audit-0',
  type: DashboardVisualisationType.LINE,
  display: 'Line chart with all missing cols',
  description: 'Line chart with all missing cols',
  columns: {
    keys: [],
    measures: [
      {
        id: 'foo',
        display: 'Foo',
      },
      {
        id: 'bar',
        display: 'Bar',
      },
    ],
    expectNulls: false,
  },
}

const lineChartAudit1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-chart-audit-1',
  type: DashboardVisualisationType.LINE,
  display: 'Line chart with some missing cols',
  description: 'Line chart with some missing cols',
  columns: {
    keys: [],
    measures: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'bar',
        display: 'Bar',
      },
    ],
    expectNulls: false,
  },
}

export const lineChartAudit2: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-chart-audit-2',
  type: DashboardVisualisationType.LINE,
  display: 'MetricOne & MetricTwo values',
  description: 'MetricOne & MetricTwo values',
  options: {
    showLatest: false,
  },
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
    ],
    measures: [
      {
        id: 'has_metric_one',
        display: 'Point 1',
      },
      {
        id: 'metric_one_is_missing',
        display: 'Point 2',
      },
      {
        id: 'has_metric_two',
        display: 'Point 3',
      },
      {
        id: 'metric_two_is_missing',
        display: 'Point 4',
      },
    ],
    expectNulls: false,
  },
}

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-line',
  name: 'line chart - Audit testing',
  description: 'Test Dashboard used for audit testing of Line charts',
  sections: [
    {
      id: 'section-0',
      display: 'Line charts - bad column ids',
      description: 'bad column ids',
      visualisations: [lineChartAudit0, lineChartAudit1],
    },

    {
      id: 'section-1',
      display: 'Line charts - max lines',
      description: 'Line charts - max lines',
      visualisations: [lineChartAudit2],
    },
  ],
  filterFields: [],
}
