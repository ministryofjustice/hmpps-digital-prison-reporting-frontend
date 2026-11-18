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
        auditSuggestions.push({
          sectionAuditKey: auditKey,
          code: 'MISSING_DASHBOARD_SECTION_NAME',
          severity: DashboardAuditSeverity.ERROR,
          title: `Missing section Name`,
          description: 'Section is missing a name',
          sectionId: id,
          sectionTitle: name,
        })
      }

      if (!description || description === '') {
        auditSuggestions.push({
          sectionAuditKey: auditKey,
          code: 'MISSING_DASHBOARD_SECTION_DESCRIPTION',
          severity: DashboardAuditSeverity.ERROR,
          title: `Missing section description`,
          description: 'Section is missing a description',
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
