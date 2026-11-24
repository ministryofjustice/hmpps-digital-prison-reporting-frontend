import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { VisualAuditContext, VisualAuditSuggestion } from '../../types'
import { DashboardDataResponse } from 'src/dpr/types/Metrics'

export interface DatasetRule {
  supportedTypes: DashboardVisualisationType[]
  audit(context: VisualAuditContext, masterDataset: DashboardDataResponse[]): VisualAuditSuggestion[]
}
