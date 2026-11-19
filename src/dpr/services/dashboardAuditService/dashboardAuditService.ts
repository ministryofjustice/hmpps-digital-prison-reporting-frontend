import {
  AuditContext,
  AuditGroup,
  AuditSuggestion,
  DashboardAuditSeverity,
  GroupedAuditSuggestions,
  SectionAuditContext,
  SectionAuditSuggestion,
  VisualAuditContext,
  VisualAuditSuggestion,
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
    return this.groupSuggestions(suggestions, context.visuals, context.sections)
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
    const { dashboard, visual, dataset, section } = this.rules

    // Run dashboard rules
    const dashboardSuggestions = dashboard.flatMap(rule => rule.audit(context))

    // Run section rules
    const sectionSuggestions = section.flatMap(rule => rule.audit(context))

    // Run visualisation rules
    const { visuals } = context
    const visualSuggestions = visuals.flatMap(visualData =>
      visual
        .filter(rule => rule.supportedTypes.includes(visualData.type) || rule.supportedTypes.length === 0)
        .flatMap(rule => rule.audit(visualData)),
    )

    // Run dataset rules
    const datasetSuggestions = visuals.flatMap(visualData =>
      dataset
        .filter(rule => rule.supportedTypes.includes(visualData.type) || rule.supportedTypes.length === 0)
        .flatMap(rule => rule.audit(visualData)),
    )

    return [...dashboardSuggestions, ...visualSuggestions, ...datasetSuggestions, ...sectionSuggestions]
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

    const visuals: VisualAuditContext[] = definition.sections.flatMap((section, sectionIndex) =>
      section.visualisations.map((vis, visIndex) => {
        const datasetConfig = datasets.find(dataset => dataset.id === vis.id)
        const dataset = datasetConfig?.dataset ?? []

        return {
          auditKey: `visual-audit-${sectionIndex}-${visIndex}`,
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

    const sectionAuditContexts: SectionAuditContext[] = definition.sections.map((section, index) => ({
      auditKey: `section-audit-${index}`,
      id: section.id,
      name: section.display,
      definition: section,
    }))

    return {
      definition,
      sections: sectionAuditContexts,
      visuals,
    }
  }

  /**
   * Group the suggestions by severity and visual ID
   *
   * @private
   * @param {AuditSuggestion[]} suggestions
   * @return {*}  {GroupedAuditSuggestions}
   * @memberof DashboardAuditService
   */
  private groupSuggestions(
    auditSuggestions: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>,
    visuals: VisualAuditContext[],
    sections: SectionAuditContext[],
  ): GroupedAuditSuggestions {
    const bySectionKey = this.groupBySectionId(auditSuggestions, sections)

    const byVisualKey = this.groupByVisualId(auditSuggestions, visuals)

    return {
      ...this.groupBySeverity(auditSuggestions),

      byVisualKey,
      bySectionKey,
    }
  }

  /**
   * Groups the audits suggestions by visual so they can be presented next to the relevant chart
   *
   * @private
   * @param {(Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>)} auditSuggestions
   * @param {VisualAuditContext[]} visuals
   * @return {*}  {Record<string, AuditGroup>}
   * @memberof DashboardAuditService
   */
  private groupByVisualId(
    auditSuggestions: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>,
    visuals: VisualAuditContext[],
  ): Record<string, AuditGroup> {
    return visuals.reduce<Record<string, AuditGroup>>((acc, visual) => {
      const visualAudit = auditSuggestions.filter(
        (suggestion): suggestion is VisualAuditSuggestion =>
          'visualAuditKey' in suggestion && suggestion.visualAuditKey === visual.auditKey,
      )

      acc[visual.auditKey] = {
        id: visual.id,
        name: visual.definition.display,
        auditKey: visual.auditKey,

        ...this.groupBySeverity(visualAudit),
      }

      return acc
    }, {})
  }

  /**
   * Groups the Audit suggestions by section so they can be presented next to the relevant chart
   *
   * @private
   * @param {(Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>)} auditSuggestions
   * @param {SectionAuditContext[]} sections
   * @return {*}  {Record<string, AuditGroup>}
   * @memberof DashboardAuditService
   */
  private groupBySectionId(
    auditSuggestions: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>,
    sections: SectionAuditContext[],
  ): Record<string, AuditGroup> {
    return sections.reduce<Record<string, AuditGroup>>((acc, section) => {
      const sectionAudit = auditSuggestions.filter(
        (suggestion): suggestion is SectionAuditSuggestion =>
          'sectionAuditKey' in suggestion && suggestion.sectionAuditKey === section.auditKey,
      )

      acc[section.auditKey] = {
        id: section.id,
        name: section.name,
        auditKey: section.auditKey,

        ...this.groupBySeverity(sectionAudit),
      }

      return acc
    }, {})
  }

  /**
   * Groups the suggestions by severity
   *
   * @private
   * @template T
   * @param {T[]} audit
   * @return {*}
   * @memberof DashboardAuditService
   */
  private groupBySeverity<T extends AuditSuggestion>(audit: T[]) {
    const errors = audit.filter(suggestion => suggestion.severity === DashboardAuditSeverity.ERROR)

    const warnings = audit.filter(suggestion => suggestion.severity === DashboardAuditSeverity.WARNING)

    const suggestions = audit.filter(suggestion => suggestion.severity === DashboardAuditSeverity.SUGGESTION)

    const info = audit.filter(suggestion => suggestion.severity === DashboardAuditSeverity.INFO)

    return {
      errors,
      warnings,
      suggestions,
      info,

      errorCount: errors.length,
      warningCount: warnings.length,
      suggestionCount: suggestions.length,
      infoCount: info.length,

      totalCount: audit.length,
    }
  }
}
