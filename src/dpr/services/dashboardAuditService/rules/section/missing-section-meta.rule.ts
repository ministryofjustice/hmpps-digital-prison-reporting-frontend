import { AuditContext, DashboardAuditSeverity, SectionAuditSuggestion } from '../../types'
import { SectionRule } from './types'

export const missingDashboardSectionMetaRule: SectionRule = {
  audit(context: AuditContext): SectionAuditSuggestion[] {
    const auditSuggestions = [] as SectionAuditSuggestion[]
    const { sections } = context

    sections.forEach(section => {
      const { name, id, auditKey, definition } = section
      const { description, visualisations, display } = definition

      if (!display || display === '') {
        const displayRuleDescription = `<p>Section is missing a name.</p>
        <p>A clear and descriptive name helps users quickly understand the purpose of the section, improves navigation, and provides important context for people using assistive technologies.</p>`

        auditSuggestions.push({
          sectionAuditKey: auditKey,
          code: 'MISSING_DASHBOARD_SECTION_NAME',
          severity: DashboardAuditSeverity.ERROR,
          title: `Missing section Name`,
          description: displayRuleDescription,
          sectionId: id,
          sectionTitle: name,
        })
      }

      if (!description || description === '') {
        const ruleDescription = `<p>Missing section description.</p>
          <p>Providing a clear description helps users understand what the section shows, communicates key insights, and improves accessibility for users who may have difficulty interpreting visual content.</p>`

        auditSuggestions.push({
          sectionAuditKey: auditKey,
          code: 'MISSING_DASHBOARD_SECTION_DESCRIPTION',
          severity: DashboardAuditSeverity.ERROR,
          title: `Missing section description`,
          description: ruleDescription,
          sectionId: id,
          sectionTitle: name,
        })
      }

      if (visualisations.length === 0) {
        auditSuggestions.push({
          sectionAuditKey: auditKey,
          code: 'MISSING_VISUALISATIONS_IN_SECTION',
          severity: DashboardAuditSeverity.SUGGESTION,
          title: 'No visualisations defined in section',
          description:
            'No visualisations have been defined in a section. Consider adding some to make this section more useful.',
          sectionId: id,
          sectionTitle: name,
        })
      }
    })

    return auditSuggestions
  },
}
