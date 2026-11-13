import { AuditContext, AuditSuggestion } from '../../types'

export interface DashboardRule {
  audit(context: AuditContext): AuditSuggestion[]
}
