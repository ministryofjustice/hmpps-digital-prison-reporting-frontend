import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const doughnutChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricThree',
  type: DashboardVisualisationType.DONUT,
  display: 'Doughnut - Max rings',
  description: 'A doughnut chart with too many rings',
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

const doughnutChartAudit1: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'doughnut-data-quality-has-MetricOne',
  type: DashboardVisualisationType.DONUT,
  display: 'Doughnut - Max segments',
  description: 'A doughnut chart with too many segments',
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
        id: 'metric_one_is_missing',
        display: 'No MetricOne',
      },
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
        id: 'has_metric_four',
        display: 'Has MetricFour',
      },
      {
        id: 'metric_four_is_missing',
        display: 'No MetricFour',
      },
    ],
    filters: [
      {
        id: 'establishment_id',
        equals: 'ABC',
      },
    ],
    expectNulls: false,
  },
}

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-doughnut',
  name: 'Doughnut chart - Audit testing',
  description: 'Test Dashboard used for audit testing of Doughnut charts',
  sections: [
    {
      id: 'section-0',
      display: 'Doughnut charts with too many rings',
      description: 'Audit example of doughnut charts with too many rings',
      visualisations: [doughnutChartAudit0],
    },
    {
      id: 'section-1',
      display: 'Doughnut charts with too many segments',
      description: 'Audit example of doughnut charts with too many segments',
      visualisations: [doughnutChartAudit1],
    },
  ],
  filterFields: [],
}
