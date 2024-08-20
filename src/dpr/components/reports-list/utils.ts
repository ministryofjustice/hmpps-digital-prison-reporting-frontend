import { Response } from 'express'
import { components } from '../../types/api'
import { Services } from '../../types/Services'

export default {
  mapReportsList: (
    res: Response,
    services: Services,
  ): { head: { text: string }[]; rows: { text?: string; html?: string }[] } => {
    const { definitions, csrfToken } = res.locals
    const pathSuffix = res.locals.pathSuffix || ''
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
            attributes: {
              tabindex: 0,
            },
          },
        ]
      })
    })

    const head = [
      { text: 'Product' },
      { text: 'Name' },
      { text: 'Description', classes: 'dpr-description-head' },
      { text: 'Bookmark', classes: 'dpr-bookmark-head' },
    ]

    return {
      head,
      rows,
    }
  },
}
