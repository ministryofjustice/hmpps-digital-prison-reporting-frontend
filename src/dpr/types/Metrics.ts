import { ChartUnit, ChartType } from './Charts'

export interface MetricsDataResponse {
  [key: string]: {
    raw: number | string
    rag?: number
  }
}

export interface MetricDefinition {
  id: string
  name: string
  display: string
  description: string
  timeseries?: boolean
  columns: MetricColumn[]
  charts: MetricChart[]
}

export interface MetricColumn {
  name: string
  display: string
  unit?: ChartUnit
}

export interface MetricChart {
  type: ChartType
  label: string
  columns: string[]
}
