import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const maxPointsRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.LINE, DashboardVisualisationType.LINE_TIMESERIES],

  audit(context: VisualAuditContext) {
    const MAX_POINTS = 30
    const auditSuggestions = []

    const { dataset } = context
    const { columns } = context.definition
    const { measures, keys } = columns

    // remove key columns from dataset
    const keyIds = new Set(keys?.map(key => key.id)) ?? []
    const datasetWithMeasuresOnly = dataset.map(row =>
      Object.fromEntries(Object.entries(row).filter(([key]) => !keyIds.has(key))),
    )

    const columnCount = datasetWithMeasuresOnly.length ? Object.keys(datasetWithMeasuresOnly[0]).length : 0
    const uniqueKey = new Set(dataset.map(row => keys?.map(key => row[key.id]?.raw ?? '').join('|')))
    const columnsAsPoints = measures.every(measure => measure.axis === undefined)

    let pointCount = columnCount
    if (!columnsAsPoints) {
      pointCount = uniqueKey.size > 0 ? dataset.length / uniqueKey.size : 0
    }

    if (pointCount > MAX_POINTS) {
      const description = `<p>Excessive numbers of points can reduce readability, make data labels difficult to display, and make it harder for users to identify meaningful trends.</p>
            <p>Consider filtering, grouping, or reducing the number of categories shown. If all the data is required then consider setting the bars to render horizontally, or splitting the data over two or more separate charts.</p>
            <p>See <a target="_blank" href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/dashboards/visualisations/line-vis/">Line chart docs</a> for more info.</p>`

      auditSuggestions.push({
        code: 'TO0_MANY_POINTS',
        severity: DashboardAuditSeverity.WARNING,
        title: 'Line chart exceeds recommended number of points',
        description,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
