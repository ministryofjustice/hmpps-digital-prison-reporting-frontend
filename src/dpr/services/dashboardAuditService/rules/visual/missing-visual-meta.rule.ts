import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const missingVisualMetaRule: VisualRule = {
  supportedTypes: [] as DashboardVisualisationType[],

  audit(context: VisualAuditContext) {
    const auditSuggestions = []

    const { description, display } = context.definition

    if (!description || description === '') {
      const ruleDescription = `<p>Your chart is missing a description.</p>
          <p>Providing a clear description helps users understand what the chart shows, communicates key insights, and improves accessibility for users who may have difficulty interpreting visual content.</p>`

      auditSuggestions.push({
        code: 'MISSING_VISUAL_DESCRIPTION',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Missing chart description',
        description: ruleDescription,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    if (!display || display === '') {
      const displayRuleDescription = `<p>Your chart is missing a name.</p>
        <p>A clear and descriptive name helps users quickly understand the purpose of the chart, improves navigation, and provides important context for people using assistive technologies.</p>`

      auditSuggestions.push({
        code: 'MISSING_VISUAL_NAME',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Missing chart name',
        description: displayRuleDescription,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
