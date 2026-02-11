import { components } from '../../../../../../src/dpr/types/api'

export const dietTotalsOverTime = {
  id: 'diet-totals-over-time',
  type: 'list',
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

export const dietTotalsByEstablishmentOverTime = {
  id: 'diet-totals-by-est-over-time',
  type: 'list',
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

export const dietTotalsByEstablishmentByWingOverTime = {
  id: 'diet-totals-by-est-by-wing-over-time',
  type: 'list',
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

export const dietTotalsByEstablishmentByWingOverTimeOptional = {
  id: 'diet-totals-by-est-by-wing-over-time-optional',
  type: 'list',
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

export const dietTotalsVegetarianOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'list',
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

export const dietTotalsVegetarianOvertimeByEst = {
  id: 'diet-totals-vegetarian-overtime-by-est',
  type: 'list',
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

export const dietTotalsVegetarianOvertimeByEstByWing = {
  id: 'diet-totals-vegetarian-overtime-by-est-by-wing',
  type: 'list',
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

export const dietTotalsVeganOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'list',
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

export const dietTotalsAllDietOvertime = {
  id: 'diet-totals-vegetarian-overtime',
  type: 'list',
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

export const dietTotalsAllDietOvertimeByEst = {
  id: 'diet-totals-all-diet-overtime-by-est',
  type: 'list',
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
