import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from 'src/dpr/types/api'

const lineTimeseriesChartAudit0: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'mockMetricOneLineChartTimeseries',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Line-timeseries chart with daily data',
  description: 'Line-timeseries chart',
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
      },
      {
        id: 'metric_one_is_missing',
        display: 'Has no MetricOne',
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

export const childDefinition1: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-line-timeseries-incorrect-monthly',
  name: 'Line Timeseries chart - Audit testing - Incorrect Monthly data',
  description: 'Test Dashboard used for audit testing of Line Timeseries charts with monthly data',
  sections: [
    {
      id: 'section-2',
      display: 'Incorrect monthly data format',
      description: 'monthly',
      visualisations: [
        {
          ...lineTimeseriesChartAudit0,
          id: 'mockMetricOneLineChartTimeseries2',
          display: 'Line-timeseries chart with monthly data',
        },
      ],
    },
  ],
  filterFields: [],
}

export const childDefinition2: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-line-timeseries-incorrect-yearly',
  name: 'Line Timeseries chart - Audit testing - Incorrect yearly data',
  description: 'Test Dashboard used for audit testing of Line Timeseries charts with yearly data',
  sections: [
    {
      id: 'section-2',
      display: 'Incorrect yearly data format',
      description: 'yearly',
      visualisations: [
        {
          ...lineTimeseriesChartAudit0,
          id: 'mockMetricOneLineChartTimeseries3',
          display: 'Line-timeseries chart with yearly data',
        },
      ],
    },
  ],
  filterFields: [],
}

export const definition: components['schemas']['DashboardDefinition'] = {
  id: 'dashboard-audit-testing-line-timeseries-daily',
  name: 'Line Timeseries chart - Audit testing - Incorrect date format data',
  description: 'Test Dashboard used for audit testing of Line Timeseries charts with daily data',
  childVariants: [childDefinition1, childDefinition2],
  sections: [
    {
      id: 'section-0',
      display: 'Incorrect daily data format',
      description: 'correct daily data format',
      visualisations: [lineTimeseriesChartAudit0],
    },
  ],
  filterFields: [],
}
