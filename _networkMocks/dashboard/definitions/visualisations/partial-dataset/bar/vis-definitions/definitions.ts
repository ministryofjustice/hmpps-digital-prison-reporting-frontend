import { UnitType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/Validate'
import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dietTotalsBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'bar-diet-totals',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals as bar chart',
  description: '',
  columns: {
    keys: [],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-bar',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentBarWithUnit: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-bar-with-unit',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals by establishment',
  description: '',
  columns: {
    keys: [
      {
        id: 'establishment_id',
        display: 'Establishment ID',
      },
    ],
    measures: [
      {
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
        unit: UnitType.PERCENTAGE,
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentByWingBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals by wing',
  description: '',
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
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: true,
  },
}

export const dietTotalsByEstablishmentByWingByCellBar: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-by-wing-by-cell-bar',
  type: DashboardVisualisationType.BAR,
  display: 'Diet totals by cell bar',
  description: '',
  options: {
    horizontal: true,
  },
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
        id: 'diet',
        display: 'Diet',
        axis: 'x',
      },
      {
        id: 'count',
        display: 'Total prisoners',
        axis: 'y',
      },
    ],
    expectNulls: false,
  },
}
