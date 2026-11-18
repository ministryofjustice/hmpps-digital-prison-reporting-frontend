import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const maxBarsRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.BAR],

  audit(context: VisualAuditContext) {
    const MAX_BARS = 16
    const auditSuggestions = []

    const { columns, options } = context.definition
    const { keys, measures } = columns
    const { dataset } = context

    // options
    const stacked = options?.xStacked ?? options?.yStacked
    const horizontal = options?.horizontal

    // remove key columns from dataset
    const keyIds = new Set(keys?.map(key => key.id)) ?? []
    const datasetWithMeasuresOnly = dataset.map(row =>
      Object.fromEntries(Object.entries(row).filter(([key]) => !keyIds.has(key))),
    )

    const columnCount = datasetWithMeasuresOnly.length ? Object.keys(datasetWithMeasuresOnly[0]).length : 0
    const rowCount = datasetWithMeasuresOnly.length ?? 0

    const columnsAsBars = measures.every(measure => measure.axis === undefined)

    let barCount = 0
    if (columnsAsBars) {
      barCount = stacked ? columnCount : columnCount * rowCount
    } else {
      barCount = stacked ? 0 : rowCount
    }

    if (barCount > MAX_BARS && !horizontal) {
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
