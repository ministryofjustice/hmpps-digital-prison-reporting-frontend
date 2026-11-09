import { AuditSuggestion, VisualAuditContext } from '../../types'

export interface DatasetRule {
  audit(context: VisualAuditContext): AuditSuggestion[]
}
