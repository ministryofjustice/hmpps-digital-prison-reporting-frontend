import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { VisualAuditContext, VisualAuditSuggestion } from '../../types'

export interface VisualRule {
  supportedTypes: DashboardVisualisationType[]
  audit(context: VisualAuditContext): VisualAuditSuggestion[]
}
