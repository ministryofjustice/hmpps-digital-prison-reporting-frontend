import { AuditContext, AuditSuggestion } from '../../types'

export interface SectionRule {
  audit(context: AuditContext): AuditSuggestion[]
}
