import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext } from '../../types'
import { VisualRule } from './types'

export const maxRingsAndSegmentsRule: VisualRule = {
  supportedTypes: [DashboardVisualisationType.DONUT],

  audit(context: VisualAuditContext) {
    const auditSuggestions = []

    const MAX_RINGS = 3
    const MAX_SEGMENTS = 8

    const { dataset } = context
    const ringCount = dataset.length
    const segmentCount = dataset.length ? Object.keys(dataset[0]).length : 0

    if (ringCount >= MAX_RINGS) {
      auditSuggestions.push({
        code: 'TOO_MANY_RINGS',
        severity: DashboardAuditSeverity.WARNING,
        title: 'Large number of rings in Doughnut chart',
        description: `<p>Excessive numbers of rings in doughnut charts can reduce readability, make data labels difficult to display, and make it harder for users to identify meaningful trends.</p>
            <p>A maximum of 2 rings is the recommended amount per doughnut chart</p>
            <p>Consider filtering, grouping, or reducing the number of categories shown. If all the data is required then consider splitting the data over two or more seperate charts, or consider using a stacked bar chart instead.</p>
            <p>See <a target="_blank" href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/dashboards/visualisations/doughnut/">Doughnut chart docs</a> for more info`,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    if (segmentCount >= MAX_SEGMENTS) {
      auditSuggestions.push({
        code: 'TO0_MANY_SEGMENTS',
        severity: DashboardAuditSeverity.WARNING,
        title: 'Large number of segments in Doughnut chart',
        description: `<p>An excessive numbers of segments in a doughnut chart can reduce readability, make data labels difficult to display, and make it harder for users to identify meaningful trends.</p>
        <p>A maximum of 4-5 segments is the recommended amount per doughnut chart</p>
      <p>Consider reducing the number of segments shown. If all the data is required then consider splitting the data over two or more seperate charts</p>
      <p>See <a target="_blank" href="https://ministryofjustice.github.io/hmpps-digital-prison-reporting-frontend/dashboards/visualisations/doughnut/">Doughnut chart docs</a> for more info`,
        visualId: context.id,
        visualTitle: context.name,
        visualAuditKey: context.auditKey,
      })
    }

    return auditSuggestions
  },
}
