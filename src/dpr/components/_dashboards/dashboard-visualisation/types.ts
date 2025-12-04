import z from 'zod'
import { components } from '../../../types/api'
import { Scorecard, ScorecardGroup } from '../scorecard/types'
import { MatrixChartData } from '../../_charts/chart/heatmap/types'
import { ChartDetails } from '../../../types/Charts'
import DashboardVisualisationSchemas from './Validate'
import { BarDefinitionMeasure } from '../../_charts/chart/bar/types'
import { DoughnutDefinitionMeasure } from '../../_charts/chart/doughnut/types'
import { LineDefinitionMeasure } from '../../_charts/chart/line/types'

export interface DashboardSection {
  id: string
  title?: string
  description?: string
  visualisations?: DashboardVisualisation[]
}

export interface DashboardVisualisation {
  id: string
  type: components['schemas']['DashboardVisualisationDefinition']['type']
  title?: string | undefined
  description?: string | undefined
  data:
    | Scorecard
    | Scorecard[]
    | ScorecardGroup[]
    | DashboardVisualisatonCardData
    | DashboardVisualisationTable
    | undefined
}

export interface DashboardVisualisatonCardData {
  chart?: DashboardVisualisationData | undefined
  table?: MoJTable | undefined
  details?: ChartDetails | undefined
}

export interface DashboardVisualisationData {
  type: DashboardVisualisationType
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
  min?: number | undefined
  max?: number | undefined
  hexColour?: string | undefined
}

export type VisualisationDefinitionType = z.infer<typeof DashboardVisualisationSchemas.DashboardVisualisationSchema>
export type VisualisationDefinitionKey = z.infer<typeof DashboardVisualisationSchemas.DashboardVisualisationKeySchema>
export type VisualisationDefinitionMeasure = z.infer<
  typeof DashboardVisualisationSchemas.DashboardVisualisationMeasureSchema
>

export type ChartMeasure =
  | BarDefinitionMeasure[]
  | DoughnutDefinitionMeasure[]
  | LineDefinitionMeasure[]
  | VisualisationDefinitionMeasure[]
