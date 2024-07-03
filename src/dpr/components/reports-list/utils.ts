import { Response } from 'express'
import { components } from '../../types/api'
import BookmarkService from '../../services/bookmarkService'

export default {
  mapReportsList: (
    res: Response,
    bookmarkService: BookmarkService,
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
          { html: bookmarkService.createBookMarkToggleHtml(reportId, variantId, csrfToken, 'reports-list') },
        ]
      })
    })

    const head = [{ text: 'Product' }, { text: 'Name' }, { text: 'Description' }, { text: '' }]

    return {
      head,
      rows,
    }
  },
}
