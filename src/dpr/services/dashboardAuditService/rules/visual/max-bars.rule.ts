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
    const uniqueKeys = new Set(dataset.map(row => (keys ?? []).map(key => row[key.id]?.raw ?? '').join('|')))
    const columnsAsBars = measures.every(measure => measure.axis === undefined)

    // Normal bar charts where each measure column represents a bar
    let barCount = stacked ? columnCount : columnCount * rowCount

    if (!columnsAsBars) {
      // Values in the X axis measure represent the bars - therefore the row count is the bar count
      barCount = rowCount

      if (stacked) {
        // keys are stacked - bar count is divided by unique key size
        barCount = uniqueKeys.size > 0 ? dataset.length / uniqueKeys.size : 0
      }
    }

    if (barCount > MAX_BARS && !horizontal) {
      const description = `<p>Excessive numbers of bars can reduce readability, make data labels difficult to display, and make it harder for users to identify meaningful trends.</p>
            <p>Consider filtering, grouping, or reducing the number of categories shown. If all the data is required then consider setting the bars to render horizontally, or splitting the data over two or more separate charts.</p>
            <p>See <a target="_blank" href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/dashboards/visualisations/bar-vis/">Bar chart docs</a> for more info.</p>`

      auditSuggestions.push({
        code: 'TOO_MANY_BARS',
        severity: DashboardAuditSeverity.WARNING,
        title: 'Bar chart exceeds recommended number of bars',
        description,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
