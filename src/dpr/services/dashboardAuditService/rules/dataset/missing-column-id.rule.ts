import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext, VisualAuditSuggestion } from '../../types'
import { DatasetRule } from './types'
import { DashboardDataResponse } from 'src/dpr/types/Metrics'

export const missingColumnIdsRule: DatasetRule = {
  supportedTypes: [] as DashboardVisualisationType[],

  audit(context: VisualAuditContext, masterDataset: DashboardDataResponse[]): VisualAuditSuggestion[] {
    const auditSuggestions = []

    const { definition } = context
    const { columns } = definition
    const { keys, measures, filters } = columns

    const ids = new Set([...(keys ?? []), ...measures, ...(filters ?? [])].map(col => col.id).filter(Boolean)) ?? []
    const missingIds = [...ids].filter(id => !(id in masterDataset[0]))

    if (missingIds.length) {
      const description = `<p>Your visualisation definition specifies columns that do not exist in the master dataset</p>
        <p>Please check the following columns exist: ${missingIds.join(', ')}</p>`

      auditSuggestions.push({
        code: 'NO_DATE_VALUE_IN_DATASET',
        severity: DashboardAuditSeverity.ERROR,
        title: `Missing columns in dataset`,
        description,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
