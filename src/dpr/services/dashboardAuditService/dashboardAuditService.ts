import {
  AuditContext,
  AuditSuggestion,
  DashboardAuditSeverity,
  GroupedAuditSuggestions,
  VisualAuditContext,
} from './types'
import { AuditRules } from './rules/types'
import { ServiceFeatureConfig } from 'src/dpr/types/DprConfig'
import { components } from 'src/dpr/types/api'
import {
  DashboardSection,
  DashboardVisualisationType,
} from 'src/dpr/components/_dashboards/dashboard-visualisation/types'

export default class DashboardAuditService {
  enabled: boolean

  constructor(
    private readonly rules: AuditRules,
    config: ServiceFeatureConfig,
  ) {
    this.enabled = Boolean(config.dashboardAudit)
  }

  audit(definition: components['schemas']['DashboardDefinition'], sections: DashboardSection[] | undefined) {
    // 1. Transform
    const context = this.buildAuditContext(definition, sections)

    // 2. Audit
    const suggestions = this.auditContext(context)

    // 3. group by severity
    return this.groupSuggestions(suggestions)
  }

  /**
   * Performs the audit of the context
   *
   * @private
   * @param {AuditContext} context
   * @return {*}  {AuditSuggestion[]}
   * @memberof DashboardAuditService
   */
  private auditContext(context: AuditContext): AuditSuggestion[] {
    const { dashboard, visual, dataset } = this.rules

    // Run dashboard rules
    const dashboardSuggestions = dashboard.flatMap(rule => rule.audit(context))

    // Run visualisation rules
    const { visuals } = context
    const visualSuggestions = visuals.flatMap(visualData =>
      visual.filter(rule => rule.supportedTypes.includes(visualData.type)).flatMap(rule => rule.audit(visualData)),
    )

    // Run dataset rules
    const datasetSuggestions = visuals.flatMap(visualData => dataset.flatMap(rule => rule.audit(visualData)))

    return [...dashboardSuggestions, ...visualSuggestions, ...datasetSuggestions]
  }

  /**
   * Builds the audit context from the visualisation definition
   * and the dataset
   *
   * @private
   * @param {components['schemas']['DashboardDefinition']} definition
   * @param {(DashboardSection[] | undefined)} config
   * @return {*}  {AuditContext}
   * @memberof DashboardAuditService
   */
  private buildAuditContext(
    definition: components['schemas']['DashboardDefinition'],
    sections: DashboardSection[] | undefined,
  ): AuditContext {
    const datasets =
      sections?.flatMap(
        section =>
          section.visualisations?.map(vis => ({
            id: vis.id,
            dataset: vis.dataset,
          })) ?? [],
      ) ?? []

    const visuals: VisualAuditContext[] = definition.sections.flatMap(section =>
      section.visualisations.map(vis => {
        const datasetConfig = datasets.find(dataset => dataset.id === vis.id)
        const dataset = datasetConfig?.dataset ?? []

        return {
          id: vis.id,
          name: vis.display,
          type: vis.type as DashboardVisualisationType,
          definition: vis,
          dataset,
          rowCount: dataset.length,
          columnCount: dataset.length > 0 ? Object.keys(dataset[0]).length : 0,
        }
      }),
    )

    return {
      definition,
      visuals,
    }
  }

  /**
   * Group the suggestions by severity
   *
   * @private
   * @param {AuditSuggestion[]} suggestions
   * @return {*}  {GroupedAuditSuggestions}
   * @memberof DashboardAuditService
   */
  private groupSuggestions(suggestions: AuditSuggestion[]): GroupedAuditSuggestions {
    const errors = suggestions.filter(s => s.severity === DashboardAuditSeverity.ERROR)

    const warnings = suggestions.filter(s => s.severity === DashboardAuditSeverity.WARNING)

    const recommendationSuggestions = suggestions.filter(s => s.severity === DashboardAuditSeverity.SUGGESTION)

    const info = suggestions.filter(s => s.severity === DashboardAuditSeverity.INFO)

    return {
      errors,
      warnings,
      suggestions: recommendationSuggestions,
      info,

      errorCount: errors.length,
      warningCount: warnings.length,
      suggestionCount: recommendationSuggestions.length,
      infoCount: info.length,

      totalCount: suggestions.length,
    }
  }
}
