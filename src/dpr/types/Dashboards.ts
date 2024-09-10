import { ChartType } from './Charts'

export interface DahsboardDefinition {
  id: string
  name: string
  description: string
  metrics: DahsboardMetricDefinition[]
}

export interface DahsboardMetricDefinition {
  id: string
  visualisationType: ChartType[]
}
