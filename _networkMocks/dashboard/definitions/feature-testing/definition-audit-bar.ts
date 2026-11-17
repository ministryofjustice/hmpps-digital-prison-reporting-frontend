import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const barChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-chart-audit-0',
  type: DashboardVisualisationType.BAR,
  display: 'Bar chart with large dataset',
  description: 'This bar chart has over the recommended number of bars',
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
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
      {
        id: 'has_metric_four',
        display: 'Has MetricFour',
      },
      {
        id: 'metric_four_is_missing',
        display: 'No MetricFour',
      },
      {
        id: 'has_metric_five',
        display: 'Has MetricFive',
      },
      {
        id: 'metric_five_is_missing',
        display: 'No MetricFive',
      },
    ],
    expectNulls: false,
  },
}

const barChartAudit0Horizontal: components['schemas']['DashboardVisualisationDefinition'] = {
  ...barChartAudit0,
  id: 'bar-chart-audit-1-horizontal',
  display: 'Horizontal bar chart',
  description: 'This bar chart has over the recommended number of bars but is horizontal',
  options: {
    horizontal: true,
  },
}

const barChartAudit1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-chart-audit-2',
  type: DashboardVisualisationType.BAR,
  display: 'Bar chart rows as Bars',
  description: 'This bar chart has over the recommended number of bars',
  options: {
    showLatest: false,
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
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
        axis: 'x',
      },
      {
        id: 'metric_two_is_missing',
        display: 'No MetricTwo',
        axis: 'y',
      },
    ],
    expectNulls: false,
  },
}

const barChartAudit1Horizontal: components['schemas']['DashboardVisualisationDefinition'] = {
  ...barChartAudit1,
  id: 'bar-chart-audit-1-horizontal',
  display: 'Horizontal bar chart',
  description: 'This bar chart has over the recommended number of bars but is horizontal',
  options: {
    showLatest: false,
    horizontal: true,
  },
}

const barChartAudit2: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-chart-stacked-vertical-visualisation',
  type: DashboardVisualisationType.BAR,
  display: 'Stacked bar chart',
  description: 'This bar chart has over the recommended number of stacked bars',
  options: {
    xStacked: true,
    yStacked: true,
    showLatest: false,
  },
  columns: {
    keys: [
      {
        id: 'ts',
        display: 'Date',
        type: 'timestamp',
      },
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
        id: 'has_metric_two',
        display: 'Has MetricTwo',
      },
    ],
    expectNulls: false,
  },
}

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-bar',
  name: 'Bar chart - Audit testing',
  description: 'Test Dashboard used for audit testing of bar charts',
  sections: [
    {
      id: 'section-0',
      display: 'Bar charts audit section - columns as bars',
      description: 'This section shows examples of bar chart specific audit rules',
      visualisations: [barChartAudit0, barChartAudit0Horizontal],
    },
    {
      id: 'section-1',
      display: 'Bar charts audit section - rows as bars',
      description: 'This section shows examples of bar chart specific audit rules',
      visualisations: [barChartAudit1, barChartAudit1Horizontal],
    },
    {
      id: 'section-2',
      display: 'Bar charts audit section - stacked',
      description: 'This section shows examples of bar chart specific audit rules',
      visualisations: [barChartAudit2],
    },
  ],
  filterFields: [],
}
