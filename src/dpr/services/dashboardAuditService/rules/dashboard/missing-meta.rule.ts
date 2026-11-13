import { AuditContext, AuditSuggestion, DashboardAuditSeverity } from '../../types'
import { DashboardRule } from './types'

export const missingDashboardMetaRule: DashboardRule = {
  audit(context: AuditContext): AuditSuggestion[] {
    const auditSuggestions = []

    const { description, name } = context.definition

    if (!name || name === '') {
      auditSuggestions.push({
        code: 'MISSING_DASHBOARD_NAME',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Missing Dashboard Name',
        description: 'Your dashboard is missing a name',
      })
    }

    if (!description || description === '') {
      auditSuggestions.push({
        code: 'MISSING_DASHBOARD_DESCRIPTION',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Missing top level description',
        description: 'Your dashboard is missing a top level description',
      })
    }

    return auditSuggestions
  },
}
