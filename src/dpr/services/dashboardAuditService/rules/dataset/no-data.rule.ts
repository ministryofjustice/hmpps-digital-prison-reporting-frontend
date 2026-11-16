import { DashboardAuditSeverity, VisualAuditContext, VisualAuditSuggestion } from '../../types'
import { DatasetRule } from './types'

export const noVisualDatasetRule: DatasetRule = {
  audit(context: VisualAuditContext): VisualAuditSuggestion[] {
    const auditSuggestions = []

    const datasetLength = context.dataset.length

    if (!datasetLength) {
      auditSuggestions.push({
        code: 'NO_VISUAL_DATASET',
        severity: DashboardAuditSeverity.ERROR,
        title: 'No data in visualisation dataset',
        description:
          'Your visualisation definition has pulled no data from the master dataset. Check the definition to ensure columns are defined correctly',
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
