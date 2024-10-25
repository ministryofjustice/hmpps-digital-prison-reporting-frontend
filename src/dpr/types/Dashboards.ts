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
