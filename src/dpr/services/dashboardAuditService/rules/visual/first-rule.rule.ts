import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const firstVisualRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.BAR],

  audit(context: VisualAuditContext) {
    // logic here

    return [
      {
        code: 'RULE_CODE',
        severity: DashboardAuditSeverity.INFO,
        title: 'Rule title',
        description: 'This is the description of the audit finding.',
        visualId: context.id,
        visualTitle: context.name,
      },
    ]
  },
}
