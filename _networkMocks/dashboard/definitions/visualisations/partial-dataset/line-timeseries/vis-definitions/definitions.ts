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

export const dietTotalsVegetarianOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegetarian-overtime',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Vegetarian totals over time line chart',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVeganOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegan-overtime',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Vegan totals over time line chart',
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
        equals: 'Vegan',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVegetarianOvertimeByEstLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-diet-totals-vegetarian-overtime-by-est',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Vegetarian totals over time line',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVegetarianOvertimeByEstByWingLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-diet-totals-vegetarian-overtime-by-est-by-wing',
  type: DashboardVisualisationType.LINE_TIMESERIES,
  display: 'Vegetarian totals over time by wing line',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVegetarianOvertimeByEstByWingAndCellLine: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'line-diet-totals-vegetarian-overtime-by-est-by-wing-cell',
    type: DashboardVisualisationType.LINE_TIMESERIES,
    display: 'Vegetarian totals over time by wing line',
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
