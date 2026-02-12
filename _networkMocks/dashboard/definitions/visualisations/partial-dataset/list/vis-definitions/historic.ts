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

export const dietTotalsVegetarianOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegetarian-overtime',
  type: DashboardVisualisationType.LIST,
  display: 'Vegetarian totals over time',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVegetarianOvertimeByEst: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegetarian-overtime-by-est',
  type: DashboardVisualisationType.LIST,
  display: 'Vegetarian totals over time',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVegetarianOvertimeByEstByWing: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegetarian-overtime-by-est-by-wing',
  type: DashboardVisualisationType.LIST,
  display: 'Vegetarian totals over time by wing',
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
        equals: 'Vegetarian',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsVeganOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegetarian-overtime',
  type: DashboardVisualisationType.LIST,
  display: 'Vegan totals over time',
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
        equals: 'Vegan',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsAllDietOvertime: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-vegetarian-overtime',
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
