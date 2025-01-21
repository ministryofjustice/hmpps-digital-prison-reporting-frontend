import { components } from './api'
import { ChartUnit, ChartType } from './Charts'

export interface DashboardDefinition {
  id: string
  name: string
  description: string
  metrics: DashboardMetricDefinition[]
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
