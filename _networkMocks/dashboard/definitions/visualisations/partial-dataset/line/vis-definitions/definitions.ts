import { components } from '../../../../../../../src/dpr/types/api'
import { DashboardVisualisationType } from '../../../../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'

export const dietTotalsLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'line-diet-totals',
  type: DashboardVisualisationType.LINE,
  display: 'Diet totals as line chart',
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

export const dietTotalsByEstablishmentLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment-line',
  type: DashboardVisualisationType.LINE,
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

export const dietTotalsByEstablishmentByWingLine: components['schemas']['DashboardVisualisationDefinition'] = {
  id: 'diet-totals-by-establishment',
  type: DashboardVisualisationType.LINE,
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
