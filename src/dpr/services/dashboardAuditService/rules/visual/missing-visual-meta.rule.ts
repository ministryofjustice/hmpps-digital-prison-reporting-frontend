import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const missingVisualMetaRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.BAR],

  audit(context: VisualAuditContext) {
    const auditSuggestions = []

    const { description, display } = context.definition

    if (!description || description === '') {
      auditSuggestions.push({
        code: 'MISSING_VISUAL_DESCRIPTION',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Missing chart description',
        description: 'Your chart is missing a description',
        visualId: context.id,
        visualTitle: context.name,
      })
    }

    if (!display || display === '') {
      auditSuggestions.push({
        code: 'MISSING_VISUAL_NAME',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Missing chart name',
        description: 'Your chart is missing a name',
        visualId: context.id,
        visualTitle: context.name,
      })
    }

    return auditSuggestions
  },
}
