import { components } from '../../../types/api'
import { ChartCardData, MoJTable, UnitType } from '../../../types/Charts'
import { Scorecard, ScorecardGroup } from '../scorecard/types'

export interface DashboardDefinition {
  id: string
  name: string
  description?: string
  sections: DashboardSection[]
  isMissing?: boolean
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
  options: DashboardVisualisationOptions
}

export type DashboardVisualisationOptions = ListDashboardVisualisationOptions | BucketDashboardVisualisationOptions

export interface ListDashboardVisualisationOptions {
  showLatest?: boolean
  columnsAsList?: boolean
}

export interface BucketDashboardVisualisationOptions {
  useRagColour?: boolean
  buckets?: DashboardVisualisationBucket[]
  baseColour?: string
}

export interface DashboardVisualisationBucket {
  min?: number
  max?: number
  hexColour?: string
}

export interface ListVisualisation extends DashboardVisualisation {
  type: DashboardVisualisationType.LIST
}

export enum DashboardVisualisationType {
  LIST = 'list',
  DONUT = 'doughnut',
  BAR = 'bar',
  LINE = 'line',
  MATRIX = 'matrix',
  MATRIX_TIMESERIES = 'matrix-timeseries',
  BAR_TIMESERIES = 'bar-timeseries',
  LINE_TIMESERIES = 'line-timeseries',
  SCORECARD = 'scorecard',
  SCORECARD_GROUP = 'scorecard-group',
}

export interface DashboardVisualisationColumns {
  keys?: DashboardVisualisationColumnKey[]
  measures: DashboardVisualisationColumnMeasure[]
  filters?: DashboardVisualisationColumnFilter[]
  expectNulls: boolean
}

export interface DashboardVisualisationColumn {
  id: string
  display?: string
}

export interface DashboardVisualisationColumnKey extends DashboardVisualisationColumn {
  optional?: boolean
}

export interface DashboardVisualisationColumnMeasure extends DashboardVisualisationColumn {
  aggregate?: AggregateType
  displayValue?: boolean
  unit?: UnitType
  axis?: 'x' | 'y'
}

export interface DashboardVisualisationColumnFilter {
  id: string
  equals: string | number
}

export interface BarChartVisualisationColumn extends DashboardVisualisationColumnMeasure {
  axis?: 'x' | 'y'
}

export interface ScorecardVisualisationColumn extends DashboardVisualisationColumn {
  displayValue: boolean
}

export enum AggregateType {
  SUM = 'sum',
  AVG = 'average',
}
