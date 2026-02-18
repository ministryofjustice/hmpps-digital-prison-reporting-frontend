import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a two column table
 */
export const dietTotals: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals',
  type: DashboardVisualisationType.LIST,
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
export const dietTotalsWithFilters: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-with-filters',
  type: DashboardVisualisationType.LIST,
  display: 'Diet totals filter on DietOne',
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
        equals: 'DietOne',
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
export const dietTotalsWithFiltersSingleColumn: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-single-column',
  type: DashboardVisualisationType.LIST,
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
        equals: 'DietOne',
      },
      {
        id: 'diet',
        equals: 'DietTwo',
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
export const dietTotalsByEstablishment: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment',
  type: DashboardVisualisationType.LIST,
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
        aggregate: 'sum',
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
export const dietTotalsByEstablishmentByWing: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-by-wing',
  type: DashboardVisualisationType.LIST,
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
export const dietTotalsByEstablishmentByWingByCell: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-by-wing-by-cell',
  type: DashboardVisualisationType.LIST,
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
    expectNulls: false,
  },
}

/**
 * Definition validates:
 * - expectNulls works correctly
 * - displays a FIVE column table
 * - Filter on muliple columns works correctly with multiple values
 */
export const dietTotalsByEstablishmentByWingByCellFilters: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-filters',
  type: DashboardVisualisationType.LIST,
  display: 'Diet totals by cell with filters',
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
        equals: 'Cell-1',
      },
      {
        id: 'cell',
        equals: 'cell-2',
      },
      {
        id: 'diet',
        equals: 'DietOne',
      },
      {
        id: 'diet',
        equals: 'DietFour',
      },
    ],
    expectNulls: false,
  },
}
