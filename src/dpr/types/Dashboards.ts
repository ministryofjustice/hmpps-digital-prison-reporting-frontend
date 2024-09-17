export interface DashboardDefinition {
  id: string
  name: string
  description: string
  metrics: DashboardMetricDefinition[]
}

export interface DashboardMetricDefinition {
  id: string
}
