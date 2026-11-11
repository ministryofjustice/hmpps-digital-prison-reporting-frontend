import { DashboardAuditSeverity, VisualAuditContext, VisualAuditSuggestion } from '../../types'
import { DatasetRule } from './types'

export const firstDatasetRule: DatasetRule = {
  audit(context: VisualAuditContext): VisualAuditSuggestion[] {
    // logic here

    return [
      {
        code: 'RULE_CODE',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Rule title',
        description: 'This is the description of the audit finding.',
        visualId: context.id,
        visualTitle: context.name,
      },
    ]
  },
}
