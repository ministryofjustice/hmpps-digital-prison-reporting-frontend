import { components } from '../../../types/api'
import { ChartCardData, MoJTable } from '../../../types/Charts'
import { Scorecard } from '../scorecard/types'

export interface DashboardDefinition {
  id: string
  name: string
  description: string
  sections: DashboardSection[]
  filterFields: components['schemas']['FieldDefinition'][]
}

export interface DashboardSection {
  id: string
  display?: string
  description?: string
  visualisations: []
}

export interface DashboardUISection {
  id: string
  title?: string
  description?: string
  visualisations?: DashboardUIVisualisation[]
}

export interface DashboardUIVisualisation {
  id: string
  type: DashboardVisualisationType
  title?: string
  description?: string
  data: Scorecard | Scorecard[] | ChartCardData | MoJTable
}

export interface DashboardVisualisation {
  id: string
  type: DashboardVisualisationType
  display?: string
  description?: string
  columns: DashboardVisualisationColumns
}

export enum DashboardVisualisationType {
  LIST = 'list',
  DONUT = 'doughnut',
  BAR = 'bar',
  BAR_TIMESERIES = 'bar-timeseries',
  LINE = 'line',
  SCORECARD = 'scorecard',
  SCORECARD_GROUP = 'scorecard-group',
}

export interface DashboardVisualisationColumns {
  keys: DashboardVisualisationColumn[]
  measures: DashboardVisualisationColumn[]
  values?: DashboardVisualisationColumn[]
  ignore?: DashboardVisualisationColumn[]
}

export interface DashboardVisualisationColumn {
  id: string
  display: string
  aggregate?: AggregateType
  unit?: UnitType
  equals: string | number
}

export interface BarChartVisualisationColumn extends DashboardVisualisationColumn {
  axis?: 'x' | 'y'
}

export interface ScorecardVisualisationColumn extends DashboardVisualisationColumn {
  displayValue: boolean
}

export enum AggregateType {
  SUM = 'sum',
  AVG = 'avergage',
}

export enum UnitType {
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
}
