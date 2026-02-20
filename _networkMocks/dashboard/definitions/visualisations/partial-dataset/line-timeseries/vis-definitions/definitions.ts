import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dietTotalsOverTime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'chart-diet-totals-over-time',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Prisoner totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentOverTime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'chart-diet-totals-by-est-over-time',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Prisoner totals by establishment over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietOneOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietOne-overtime',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'DietOne totals over time line chart',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'diet',
        display: 'Diet',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietThreeOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietThree-overtime',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'DietThree totals over time line chart',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'diet',
        display: 'Diet',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietThree',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietOneOvertimeByEstLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-diet-totals-DietOne-overtime-by-est',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'DietOne totals over time line',
  description: '',
  options: { showLatest: false },
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
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietOneOvertimeByEstByWingLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-diet-totals-DietOne-overtime-by-est-by-wing',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'DietOne totals over time by wing line',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'DietOne',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietOneOvertimeByEstByWingAndCellLine: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'line-diet-totals-DietOne-overtime-by-est-by-wing-cell',
    type: DashboardVisualisationType.LINE_TIMESERIES,
    display: 'DietOne totals over time by wing line',
    description: '',
    options: { showLatest: false },
    columns: {
      keys: [
        {
          id: 'establishment_id',
          display: 'Establishment ID',
        },
        {
          id: 'wing',
          display: 'Wing',
        },
        {
          id: 'cell',
          display: 'Cell',
        },
      ],
      measures: [
        {
          id: 'ts',
          display: 'Date',
        },
        {
          id: 'count',
          display: 'Total prisoners',
        },
      ],
      expectNulls: true,
    },
  }
