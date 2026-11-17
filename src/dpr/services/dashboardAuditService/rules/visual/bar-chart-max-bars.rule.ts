import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const maxBarsRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.BAR],

  audit(context: VisualAuditContext) {
    const auditSuggestions = []

    const MAX_ROWS = 16
    const { columns, options } = context.definition
    const stacked = options?.xStacked ?? options?.yStacked
    const horizontal = options?.horizontal

    const { keys, measures } = columns
    const { dataset } = context

    const keyIds = new Set(keys?.map(key => key.id)) ?? []

    const withMeasuresOnly = dataset.map(row =>
      Object.fromEntries(Object.entries(row).filter(([key]) => !keyIds.has(key))),
    )

    const columnsAsBars = measures.every(measure => measure.axis === undefined)

    let barCount = 0
    if (stacked) {
      barCount = withMeasuresOnly.length ? Object.keys(withMeasuresOnly[0]).length : 0
    } else {
      if (columnsAsBars) {
        barCount = withMeasuresOnly.length ? withMeasuresOnly.length * Object.keys(withMeasuresOnly[0]).length : 0
      } else {
        barCount = withMeasuresOnly.length ? withMeasuresOnly.length : 0
      }
    }

    if (barCount > MAX_ROWS && !horizontal) {
      auditSuggestions.push({
        code: 'TO0_MANY_BARS',
        severity: DashboardAuditSeverity.WARNING,
        title: 'Large number of bars in bar chart',
        description: `<p>Your visualisation definition has produced a very large dataset. Excessive numbers of bars can reduce readability, make data labels difficult to display, and make it harder for users to identify meaningful trends.</p>
            <p>Consider filtering, grouping, or reducing the number of categories shown. If all the data is required then consider setting the bars to render horizontally, or splitting the data over two or more seperate charts</p>
            <p>See <a target="_blank" href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/dashboards/visualisations/bar-vis/">Bar chart docs</a> for more info`,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
