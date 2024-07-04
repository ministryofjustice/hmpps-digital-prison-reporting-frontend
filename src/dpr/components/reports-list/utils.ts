import { Response } from 'express'
import { components } from '../../types/api'
import { Services } from '../../types/Services'

export default {
  mapReportsList: (
    res: Response,
    services: Services,
  ): { head: { text: string }[]; rows: { text?: string; html?: string }[] } => {
    const { definitions, pathSuffix, csrfToken } = res.locals
    const rows = definitions.flatMap((d: components['schemas']['ReportDefinitionSummary']) => {
      const { id: reportId, name: reportName, description: reportDescription } = d
      return d.variants.map((v) => {
        const { id: variantId, name: variantName, description: variantDescription } = v
        return [
          { text: reportName },
          { html: `<a href="/async-reports/${reportId}/${variantId}/request${pathSuffix}">${variantName}</a>` },
          { text: variantDescription || reportDescription },
          {
            html: services.bookmarkService.createBookMarkToggleHtml(reportId, variantId, csrfToken, 'reports-list'),
            classes: 'dpr-vertical-align',
          },
        ]
      })
    })

    const head = [{ text: 'Product' }, { text: 'Name' }, { text: 'Description' }, { text: 'Bookmark' }]

    return {
      head,
      rows,
    }
  },
}
