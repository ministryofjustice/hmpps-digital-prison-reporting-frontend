import { ChartType, ChartUnit } from './Charts'
import Dict = NodeJS.Dict

export interface MetricsDefinition {
  id: string
  name: string
  display: string
  description: string
  visualisationType: ChartType[]
  specification: MetricsDefinitionSpecification[]
}

export interface MetricsDefinitionSpecification {
  name: string
  display: string
  unit?: ChartUnit
}

export interface MetricsDataResponse {
  id: string
  data: Array<Dict<string | number>>
  updated: string
}
