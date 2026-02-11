import { components } from '../../../../../../src/dpr/types/api'

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a two column table
 */
export const dietTotals = {
  id: 'diet-totals',
  type: 'list',
  display: 'Diet totals',
  description: '',
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
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

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a two column table
 * - Filter on single column works correctly with single value
 */
export const dietTotalsWithFilters = {
  id: 'diet-totals-with-filters',
  type: 'list',
  display: 'Diet totals filter on vegetarian',
  description: '',
  columns: {
    keys: <components['schemas']['DashboardVisualisationColumnDefinition'][]>[],
    measures: [
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

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a TWO column table
 * - Filter on single column works correctly with multiple values
 */
export const dietTotalsWithFiltersSingleColumn = {
  id: 'diet-totals-single-column',
  type: 'list',
  display: 'Diet totals single column',
  description: '',
  columns: {
    keys: [
      {
        id: 'diet',
        display: 'Diet',
      },
    ],
    measures: [
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
      {
        id: 'diet',
        equals: 'Pescatarian',
      },
    ],
    expectNulls: true,
  },
}

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a THREE column table
 */
export const dietTotalsByEstablishment = {
  id: 'diet-totals-by-establishment',
  type: 'list',
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
      },
    ],
    measures: [
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

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a FOUR column table
 */
export const dietTotalsByEstablishmentByWing = {
  id: 'diet-totals-by-establishment-by-wing',
  type: 'list',
  display: 'Diet totals by establishment, by wing',
  description: '',
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
    expectNulls: true,
  },
}

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a FIVE column table
 */
export const dietTotalsByEstablishmentByWingByCell = {
  id: 'diet-totals-by-establishment-by-wing-by-cell',
  type: 'list',
  display: 'Diet totals by cell',
  description: '',
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
        id: 'cell',
        display: 'Cell',
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
  },
}

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a FIVE column table
 * - Filter on muliple columns works correctly with multiple values
 */
export const dietTotalsByEstablishmentByWingByCellFilters = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-filters',
  type: 'list',
  display: 'Diet totals by cell',
  description: '',
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
        id: 'cell',
        display: 'Cell',
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
        id: 'cell',
        display: 'Cell-1',
      },
      {
        id: 'cell',
        display: 'Cell-2',
      },
      {
        id: 'diet',
        display: 'Vegetarian',
      },
      {
        id: 'diet',
        display: 'Omnivore',
      },
    ],
  },
}
