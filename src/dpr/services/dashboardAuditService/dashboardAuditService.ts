import { DatasetRule } from './rules/dataset/types'
import { DashboardRule } from './rules/generic/types'
import { VisualRule } from './rules/visual/types'
import { AuditContext, AuditSuggestion } from './types'

export class DashboardAuditService {
  constructor(
    private readonly dashboardRules: DashboardRule[],
    private readonly visualRules: VisualRule[],
    private readonly datasetRules: DatasetRule[],
  ) {}

  audit(context: AuditContext): AuditSuggestion[] {
    const dashboardSuggestions = this.dashboardRules.flatMap(rule => rule.audit(context))

    const { visuals } = context
    const visualSuggestions = visuals.flatMap(visual =>
      this.visualRules
        .filter(rule => rule.supportedTypes.includes(visual.visualType))
        .flatMap(rule => rule.audit(visual)),
    )

    const datasetSuggestions = visuals.flatMap(visual => this.datasetRules.flatMap(rule => rule.audit(visual)))

    return [...dashboardSuggestions, ...visualSuggestions, ...datasetSuggestions]
  }
}
