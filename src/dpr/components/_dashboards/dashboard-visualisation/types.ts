import { components } from '../../../types/api'
import { Scorecard, ScorecardGroup } from '../scorecard/types'
import { MatrixChartData } from '../../_charts/chart/heatmap/types'
import { ChartDetails } from '../../../types/Charts'

export interface DashboardSection {
  id: string
  title?: string
  description?: string
  visualisations?: DashboardVisualisation[]
}

export interface DashboardVisualisation {
  id: string
  type: components['schemas']['DashboardVisualisationDefinition']['type']
  title?: string
  description?: string
  data:
    | Scorecard
    | Scorecard[]
    | ScorecardGroup[]
    | DashboardVisualisatonCardData
    | DashboardVisualisationTable
    | undefined
}

export interface DashboardVisualisatonCardData {
  chart: DashboardVisualisationData
  table?: MoJTable
  details?: ChartDetails
}

export interface DashboardVisualisationData {
  type: components['schemas']['DashboardVisualisationDefinition']['type']
  unit?: components['schemas']['DashboardVisualisationColumnDefinition']['unit']
  data: DashboardVisualisationDataValues
  timeseries?: boolean
}

export interface DashboardVisualisationDataValues {
  labels?: string[]
  datasets: DashboardVisualisationDataSet[]
  axis?: 'x' | 'y'
}

export interface DashboardVisualisationDataSet {
  label: string
  data: number[] | MatrixChartData[]
  total?: number
}

export interface DashboardVisualisationTable {
  table: MoJTable
  ts?: string
}

export interface MoJTable {
  head: MoJTableHead[]
  rows: MoJTableRow[][]
}

export interface MoJTableRow {
  text?: string
  html?: string
}

export interface MoJTableHead {
  text?: string
  html?: string
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
