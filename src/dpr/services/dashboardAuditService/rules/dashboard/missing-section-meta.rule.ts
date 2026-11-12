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
          title: 'Missing section Name',
          description: id ? `Section with id: "${id}" is missing a name` : 'Section is missing a name',
        })
      }

      if (!description || description === '') {
        const identifier = display ?? id

        auditSuggestions.push({
          code: 'MISSING_DASHBOARD_SECTION_DESCRIPTION',
          severity: DashboardAuditSeverity.ERROR,
          title: 'Missing section description',
          description: identifier
            ? `Section with id: "${identifier}" is missing a description`
            : 'Section is missing a description',
        })
      }

      if (!id || id === '') {
        auditSuggestions.push({
          code: 'MISSING_DASHBOARD_SECTION_ID',
          severity: DashboardAuditSeverity.ERROR,
          title: 'Missing section ID',
          description: display ? `Section with name: "${display}" is missing an ID` : 'Section is missing an ID',
        })
      }

      if (visualisations.length === 0) {
        const identifier = display ?? id

        auditSuggestions.push({
          code: 'MISSING_DASHBOARD_SECTION_ID',
          severity: DashboardAuditSeverity.SUGGESTION,
          title: 'No visualisations defined',
          description: identifier
            ? `No visualisations have been defined in section "${identifier}". Consider adding some to make this section more useful.`
            : 'No visualisations have been defined in a section. Consider adding some to make this section more useful.',
        })
      }
    })

    const duplicateIds = sections.length !== new Set(sections.map(section => section.id)).size

    if (duplicateIds) {
      auditSuggestions.push({
        code: 'MISSING_DASHBOARD_DUPLICATE_SECTION_ID',
        severity: DashboardAuditSeverity.ERROR,
        title: 'Duplicate section IDs',
        description: 'Multiple sections have been given the same IDs. This will cause the sidebar navigation to break.',
      })
    }

    return auditSuggestions
  },
}
