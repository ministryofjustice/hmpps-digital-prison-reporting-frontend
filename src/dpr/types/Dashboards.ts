import { components } from './api'
import { ChartUnit, ChartType } from './Charts'
import { MetricDefinition } from './Metrics'

export interface DashboardDefinition {
  id: string
  name: string
  description: string
  metrics: MetricDefinition[]
  scorecards: DashboardScorecardsGroup[]
  filterFields: components['schemas']['FieldDefinition'][]
}

export interface DashboardMetricDefinition {
  id: string
  name: string
  display: string
  timeseries?: boolean
  description: string
  charts: DashboardChartDefinition[]
}

export interface DashboardScorecardsGroup {
  id: string
  name: string
  display: string
  description: string
  scorecards: DashboardScorecard[]
}

export interface DashboardScorecard {
  label: string
  unit: string
  column: string
}
export interface DashboardChartDefinition {
  type: ChartType
  unit: ChartUnit
  label: ChartColumn
  columns: ChartColumn[]
}

interface ChartColumn {
  name: string
  display: string
}
