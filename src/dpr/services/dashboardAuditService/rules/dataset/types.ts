import { VisualAuditContext, VisualAuditSuggestion } from '../../types'

export interface DatasetRule {
  audit(context: VisualAuditContext): VisualAuditSuggestion[]
}
