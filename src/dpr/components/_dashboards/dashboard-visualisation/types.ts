import z from 'zod'
import { components } from '../../../types/api'
import { Scorecard, ScorecardGroup } from '../scorecard/types'
import { MatrixChartData } from '../../_charts/chart/heatmap/types'
import { ChartDetails } from '../../../types/Charts'
import DashboardVisualisationSchemas from './Validate'

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

export type ScorecardDefinitonType = z.infer<typeof DashboardVisualisationSchemas.ScorecardSchema>
export type ScorecardGroupDefinitionType = z.infer<typeof DashboardVisualisationSchemas.ScorecardGroupSchema>
export type MarricTimeseriesDefinitionType = z.infer<typeof DashboardVisualisationSchemas.MatrixTimeseriesSchema>
export type VisualisationDefinitionType = z.infer<typeof DashboardVisualisationSchemas.DashboardVisualisationSchema>
export type ListDefinitionType = z.infer<typeof DashboardVisualisationSchemas.ListSchema>
export type BarDefinitionType = z.infer<typeof DashboardVisualisationSchemas.BarSchema>
export type BarTimeseriesDefinitionType = z.infer<typeof DashboardVisualisationSchemas.BarTimeseriesSchema>
export type LineDefinitionType = z.infer<typeof DashboardVisualisationSchemas.LineSchema>
export type LineTimeseriesTypeDefinitionType = z.infer<typeof DashboardVisualisationSchemas.DoughnutSchema>
export type DoughnutDefinitionType = z.infer<typeof DashboardVisualisationSchemas.DoughnutSchema>
