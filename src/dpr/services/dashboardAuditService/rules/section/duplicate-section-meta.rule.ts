import { AuditContext, DashboardAuditSeverity, SectionAuditSuggestion } from '../../types'
import { SectionRule } from './types'

export const duplicateDashboardSectionMetaRule: SectionRule = {
  audit(context: AuditContext): SectionAuditSuggestion[] {
    const auditSuggestions = [] as SectionAuditSuggestion[]
    const { sections } = context

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
