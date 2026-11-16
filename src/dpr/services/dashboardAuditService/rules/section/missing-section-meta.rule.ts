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

    const seen = new Set<string>()

    const duplicateIds = sections.reduce<string[]>((duplicates, section) => {
      if (seen.has(section.id)) {
        return duplicates.includes(section.id) ? duplicates : [...duplicates, section.id]
      }

      seen.add(section.id)

      return duplicates
    }, [])

    sections.forEach(section => {
      if (!duplicateIds.includes(section.id)) {
        return
      }

      auditSuggestions.push({
        code: 'MISSING_DASHBOARD_DUPLICATE_SECTION_ID',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Duplicate section IDs',
        description: `The section ID "${section.id}" is used more than once. This will cause the sidebar navigation to break.`,

        sectionAuditKey: section.auditKey,
        sectionId: section.id,
        sectionTitle: section.name,
      })
    })

    return auditSuggestions
  },
}
