import z from 'zod'
import { components } from '../../../types/api'
import { ChartDetails } from '../../../types/Charts'
import { BarTimeseriesDefinitionMeasure } from '../../_charts/chart/bar-timeseries/types'
import { BarDefinitionMeasure } from '../../_charts/chart/bar/types'
import { ChartOptionsType } from '../../_charts/chart/chart-config'
import { DoughnutDefinitionMeasure } from '../../_charts/chart/doughnut/types'
import { MatrixChartData } from '../../_charts/chart/heatmap/types'
import { LineTimeseriesDefinitionMeasure } from '../../_charts/chart/line-timeseries/types'
import { LineDefinitionMeasure } from '../../_charts/chart/line/types'
import { PartialDate } from '../../_filters/types'
import { Scorecard, ScorecardGroup } from '../scorecard/types'
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
  title?: string | undefined
  description?: string | undefined
  isEnabled: boolean
  data:
    | Scorecard
    | Scorecard[]
    | ScorecardGroup[]
    | DashboardVisualisationCardData
    | DashboardVisualisationTable
    | undefined
}

export interface DashboardVisualisationCardData {
  chart?: DashboardVisualisationData | undefined
  table?: MoJTable | undefined
  details?: ChartDetails | undefined
}

export interface DashboardVisualisationData {
  type: DashboardVisualisationType
  options?: DashboardVisualisationDataOptions
  data: DashboardVisualisationDataValues
}

interface DashboardVisualisationDataOptions {
  height?: number
  unit?: components['schemas']['DashboardVisualisationColumnDefinition']['unit']
  timeseries?: boolean
}

export interface DashboardVisualisationDataValues {
  labels?: string[]
  datasets: DashboardVisualisationDataSet[]
  axis?: 'x' | 'y'
  config: ChartOptionsType
  partialDate?: PartialDate | undefined
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
  classes?: string
  attributes?: Record<string, string>
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
  | BarDefinitionMeasure
  | DoughnutDefinitionMeasure
  | LineDefinitionMeasure
  | VisualisationDefinitionMeasure

export type TimeseriesChartMeasure = LineTimeseriesDefinitionMeasure[] | BarTimeseriesDefinitionMeasure[]

// NOTE: This is a temporary type while to mock the new field which will be added the the schema in ticket https://dsdmoj.atlassian.net/browse/DPR2-2981
// TODO: Remove this type and update all references to it when the components['schemas']['DashboardDefinition'] type is up to date
export type DashboardDefinition = components['schemas']['DashboardDefinition'] & {
  childVariants: components['schemas']['DashboardDefinition'][]
}
