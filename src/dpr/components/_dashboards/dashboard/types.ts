import { components } from '../../../types/api'
import { ChartCardData, MoJTable, UnitType } from '../../../types/Charts'
import { Scorecard, ScorecardGroup, ScorecardSubGroup } from '../scorecard/types'

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
  visualisations: DashboardVisualisation[]
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
  data: Scorecard | Scorecard[] | ScorecardGroup[] | ChartCardData | { table: MoJTable; ts: string }
}

export interface DashboardVisualisation {
  id: string
  type: DashboardVisualisationType
  display?: string
  description?: string
  columns: DashboardVisualisationColumns
  showLatest?: boolean
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
  keys?: DashboardVisualisationColumn[]
  measures: DashboardVisualisationColumn[]
  filters?: ValueVisualisationColumn[]
  expectNulls: boolean
}

export interface DashboardVisualisationColumn {
  id: string
  display?: string
  aggregate?: AggregateType
  unit?: UnitType
  optional?: boolean
}

export interface ValueVisualisationColumn {
  id: string
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
  AVG = 'average',
}
