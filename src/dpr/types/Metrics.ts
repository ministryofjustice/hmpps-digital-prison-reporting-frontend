import { ChartType, ChartUnit } from './Charts'

export interface MetricsDefinition {
  id: string
  name: string
  display: string
  description: string
  specification: MetricsDefinitionSpecification[]
}

export interface MetricsDefinitionSpecification {
  name: string
  display: string
  unit?: ChartUnit
  group?: true
  chart?: ChartType[]
}

export interface MetricsDataResponse {
  [key: string]: number | string
}
