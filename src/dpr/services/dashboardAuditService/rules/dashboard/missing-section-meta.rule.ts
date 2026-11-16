import { AuditContext, AuditSuggestion, DashboardAuditSeverity } from '../../types'
import { DashboardRule } from './types'

export const missingDashboardSectionMetaRule: DashboardRule = {
  audit(context: AuditContext): AuditSuggestion[] {
    const auditSuggestions = [] as AuditSuggestion[]

    const { sections } = context.definition

    sections.forEach(section => {
      const { display, description, id, visualisations } = section
      if (!display || display === '') {
        auditSuggestions.push({
          code: 'MISSING_DASHBOARD_SECTION_NAME',
          severity: DashboardAuditSeverity.ERROR,
          title: `${id} - Missing section Name`,
          description: id ? `Section with id: "${id}" is missing a name` : 'Section is missing a name',
        })
      }

      if (!description || description === '') {
        const identifier = display || id

        auditSuggestions.push({
          code: 'MISSING_DASHBOARD_SECTION_DESCRIPTION',
          severity: DashboardAuditSeverity.ERROR,
          title: identifier ? `${identifier} - Missing section description` : `Missing section description`,
          description: identifier
            ? `Section with id: "${identifier}" is missing a description`
            : 'Section is missing a description',
        })
      }

      if (visualisations.length === 0) {
        const identifier = display ?? id
        const title = 'No visualisations defined in section'

        auditSuggestions.push({
          code: 'MISSING_VISUALISATIONS_IN_SECTION',
          severity: DashboardAuditSeverity.SUGGESTION,
          title: identifier ? `${identifier} - ${title}` : `${title}`,
          description: identifier
            ? `No visualisations have been defined in section "${identifier}". Consider adding some to make this section more useful.`
            : 'No visualisations have been defined in a section. Consider adding some to make this section more useful.',
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

    if (duplicateIds.length > 0) {
      auditSuggestions.push({
        code: 'MISSING_DASHBOARD_DUPLICATE_SECTION_ID',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Duplicate section IDs',
        description: `Duplicate section IDs found: ${Array.from(duplicateIds).join(', ')}. This will cause the sidebar navigation to break.`,
      })
    }

    return auditSuggestions
  },
}
