import { AuditContext, DashboardAuditSeverity } from '../../types'
import { DashboardRule } from './types'

export const firstDashboardRule: DashboardRule = {
  audit(_context: AuditContext) {
    // logic here
    return [
      {
        code: 'RULE_CODE',
        severity: DashboardAuditSeverity.INFO,
        title: 'Rule title',
        description: 'This is the description of the audit finding.',
      },
    ]
  },
}
