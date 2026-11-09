import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { DatasetRule } from './types'

export const firstDatasetRule: DatasetRule = {
  audit(_context: VisualAuditContext) {
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
