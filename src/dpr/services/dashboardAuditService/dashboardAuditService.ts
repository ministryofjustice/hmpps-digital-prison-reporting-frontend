import { AuditContext, AuditSuggestion } from './types'
import { AuditRules } from './rules/types'
import { ServiceFeatureConfig } from 'src/dpr/types/DprConfig'

export default class DashboardAuditService {
  enabled: boolean

  constructor(
    private readonly rules: AuditRules,
    config: ServiceFeatureConfig,
  ) {
    this.enabled = Boolean(config.dashboardAudit)
  }

  audit(context: AuditContext): AuditSuggestion[] {
    const { dashboard, visual, dataset } = this.rules

    // Run dashboard rules
    const dashboardSuggestions = dashboard.flatMap(rule => rule.audit(context))

    // Run visualisation rules
    const { visuals } = context
    const visualSuggestions = visuals.flatMap(visualData =>
      visual
        .filter(rule => rule.supportedTypes.includes(visualData.visualType))
        .flatMap(rule => rule.audit(visualData)),
    )

    // Run dataset rules
    const datasetSuggestions = visuals.flatMap(visualData => dataset.flatMap(rule => rule.audit(visualData)))

    return [...dashboardSuggestions, ...visualSuggestions, ...datasetSuggestions]
  }
}
