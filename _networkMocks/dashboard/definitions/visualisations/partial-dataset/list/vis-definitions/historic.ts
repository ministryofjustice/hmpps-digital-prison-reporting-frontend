import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dietTotalsOverTime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-over-time',
  type: DashboardVisualisationType.LIST,
  display: 'Prisoner totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
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
  id: 'diet-totals-by-est-over-time',
  type: DashboardVisualisationType.LIST,
  display: 'Prsioner totals by establishment over time',
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
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentByWingOverTime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-est-by-wing-over-time',
  type: DashboardVisualisationType.LIST,
  display: 'Prisoner totals by establishment, by wing, over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
      {
        id: 'wing',
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentByWingOverTimeOptional: components['schemas']['DashboardVisualisationDefinition'] =
  {
    id: 'diet-totals-by-est-by-wing-over-time-optional',
    type: DashboardVisualisationType.LIST,
    display: 'Diet totals by Establishment, by wing, over time',
    description: '',
    options: { showLatest: false },
    columns: {
      keys: [
        {
          id: 'establishment_id',
          optional: true,
        },
        {
          id: 'wing',
          optional: true,
        },
      ],
      measures: [
        {
          id: 'ts',
          display: 'Date',
        },
        {
          id: 'establishment_id',
          display: 'Establishment ID',
        },
        {
          id: 'wing',
          display: 'Wing',
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
  type: DashboardVisualisationType.LIST,
  display: 'DietOne totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Diet one',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietOneOvertimeByEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietOne-overtime-by-est',
  type: DashboardVisualisationType.LIST,
  display: 'DietOne totals over time by establishment',
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
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Diet one',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietOneOvertimeByEstByWing: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietOne-overtime-by-est-by-wing',
  type: DashboardVisualisationType.LIST,
  display: 'DietOne totals over time by wing',
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
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'wing',
        display: 'Wing',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    filters: [
      {
        id: 'diet',
        equals: 'Diet one',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsDietThreeOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietOne-overtime',
  type: DashboardVisualisationType.LIST,
  display: 'DietThree totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
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

export const dietTotalsAllDietOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-DietOne-overtime',
  type: DashboardVisualisationType.LIST,
  display: 'All Diet totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsAllDietOvertimeByEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-all-diet-overtime-by-est',
  type: DashboardVisualisationType.LIST,
  display: 'All Diet totals over time',
  description: '',
  options: { showLatest: false },
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
        optional: true,
      },
    ],
    measures: [
      {
        id: 'ts',
        display: 'Date',
      },
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
      {
        id: 'diet',
        display: 'Diet',
      },
      {
        id: 'count',
        display: 'Total prisoners',
      },
    ],
    expectNulls: true,
  },
}
