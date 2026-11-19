import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const maxStackedBarsRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.BAR],

  audit(context: VisualAuditContext) {
    const auditSuggestions = []
    const MAX_STACKED = 8

    const { columns, options } = context.definition
    const stacked = options?.xStacked ?? options?.yStacked
    const { keys, measures } = columns
    const { dataset } = context

    const keyIds = new Set(keys?.map(key => key.id)) ?? []

    const withMeasuresOnly = dataset.map(row =>
      Object.fromEntries(Object.entries(row).filter(([key]) => !keyIds.has(key))),
    )

    const columnsAsBars = measures.every(measure => measure.axis === undefined)
    const stackedCount = withMeasuresOnly.length ? withMeasuresOnly.length : 0

    if (columnsAsBars && stacked && stackedCount > MAX_STACKED) {
      const description = `<p>Excessive numbers of stacked segments can reduce readability, make data labels difficult to display, and make it harder for users to identify meaningful trends.</p>
            <p>Consider filtering, grouping, or reducing the number of stacked bars shown. If all the data is required then consider splitting the data over two or more seperate charts</p>
            <p>See <a target="_blank" href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/dashboards/visualisations/bar-vis/">Bar chart docs</a> for more info`

      auditSuggestions.push({
        code: 'TOO_MANY_STACKED',
        severity: DashboardAuditSeverity.WARNING,
        title: 'Large number of stacked segments',
        description,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
