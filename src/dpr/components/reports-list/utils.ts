import { Response } from 'express'
import { components } from '../../types/api'
import { Services } from '../../types/Services'

interface variantData {
  reportName: string
  reportId: string
  variantId: string
  variantName: string
  variantDescription: string
  reportDescription: string
}
export default {
  mapReportsList: (
    res: Response,
    services: Services,
  ): { head: { text: string }[]; rows: { text?: string; html?: string }[] } => {
    const { definitions, csrfToken } = res.locals
    const pathSuffix = res.locals.pathSuffix || ''

    const sortedDefinitions = definitions.sort(
      (a: components['schemas']['ReportDefinitionSummary'], b: components['schemas']['ReportDefinitionSummary']) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      },
    )

    const sortedVariants = sortedDefinitions.flatMap((def: components['schemas']['ReportDefinitionSummary']) => {
      const { id: reportId, name: reportName, description: reportDescription } = def
      const { variants } = def

      return variants
        .map((variant) => {
          const { id: variantId, name: variantName, description: variantDescription } = variant
          return {
            reportName,
            reportId,
            variantId,
            variantName,
            variantDescription,
            reportDescription,
          }
        })
        .sort((a: variantData, b: variantData) => {
          if (a.variantName < b.variantName) return -1
          if (a.variantName > b.variantName) return 1
          return 0
        })
    })

    const rows = sortedVariants.map((v: variantData) => {
      const { variantId, variantName, variantDescription, reportName, reportId, reportDescription } = v
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
