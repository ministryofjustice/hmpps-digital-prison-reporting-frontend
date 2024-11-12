import { ChartUnit, ChartType } from './Charts'

export interface DashboardDefinition {
  id: string
  name: string
  description: string
  loadType?: 'async' | 'sync'
  metrics: DashboardMetricDefinition[]
}

export interface DashboardMetricDefinition {
  id: string
}

export interface DashboardDefinitionV2 {
  id: string
  name: string
  description: string
  loadType?: 'async' | 'sync'
  metrics: DashboardMetricDefinitionV2[]
  dataset: DashboardDataSet
}

interface DashboardMetricDefinitionV2 {
  id: string
  name: string
  display: string
  description: string
  charts: DashboardChartDefinition[]
}

interface DashboardChartDefinition {
  type: ChartType
  unit: ChartUnit
  label: ChartColumn
  columns: ChartColumn[]
}

interface ChartColumn {
  name: string
  display: string
}
interface DashboardDataSet {
  id: string
  dimension: DashboardDataSetDimension
}

interface DashboardDataSetDimension {
  id: string
  filter: string // TODO
}
