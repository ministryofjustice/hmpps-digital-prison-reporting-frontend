import { Response } from 'express'
import { components } from '../../types/api'
import { Services } from '../../types/Services'
import { DashboardDefinition } from '../../types/Dashboards'
import { ReportType } from '../../types/UserReports'
import ShowMoreUtils from '../show-more/utils'
import { createListItemProductMin } from '../../utils/reportListsHelper'

interface definitionData {
  reportName: string
  reportId: string
  id: string
  name: string
  description: string
  type: 'report' | 'dashboard'
  reportDescription: string
  loadType?: 'async' | 'sync'
}

export default {
  mapReportsList: async (
    res: Response,
    services: Services,
  ): Promise<{ head: { text: string }[]; rows: { text?: string; html?: string }[] }> => {
    const { definitions, csrfToken } = res.locals
    const pathSuffix = res.locals.pathSuffix || ''
    const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'

    // Sort report Definitions by product name
    const sortedDefinitions = definitions.sort(
      (a: components['schemas']['ReportDefinitionSummary'], b: components['schemas']['ReportDefinitionSummary']) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      },
    )

    // Sort by variant/dashboard name
    const sortedVariants = sortedDefinitions.flatMap(
      // TODO: Fix type once API types properly generated
      (def: components['schemas']['ReportDefinitionSummary'] & { dashboards: DashboardDefinition[] }) => {
        const { id: reportId, name: reportName, description: reportDescription } = def
        const { variants } = def
        const { dashboards } = def

        const variantsArray = variants.map((variant) => {
          const { id, name, description } = variant
          return {
            reportName,
            reportId,
            id,
            name,
            description,
            type: ReportType.REPORT,
            ...(reportDescription && reportDescription.length && { reportDescription }),
          }
        })

        let dashboardsArray: definitionData[] = []
        if (dashboards) {
          dashboardsArray = dashboards.map((dashboard: DashboardDefinition) => {
            const { id, name, description, loadType } = dashboard
            return {
              reportName,
              reportId,
              id,
              name,
              description,
              type: ReportType.DASHBOARD,
              reportDescription,
              loadType,
            }
          })
        }

        const mergedArray = [...dashboardsArray, ...variantsArray]

        mergedArray.sort((a: definitionData, b: definitionData) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })

        return mergedArray
      },
    )

    const rows = await Promise.all(
      sortedVariants.map(async (v: definitionData) => {
        const { id, name, description, reportName, reportId, reportDescription, type, loadType } = v
        const desc = description || reportDescription

        let bookmarkHtml = ''
        let href = `/async/${type}/${reportId}/${id}/request${pathSuffix}`

        if (type === ReportType.DASHBOARD && (!loadType || loadType !== 'async')) {
          href = `/dashboards/${reportId}/load/${id}`
        } else {
          bookmarkHtml = await services.bookmarkService.createBookMarkToggleHtml({
            userId,
            reportId,
            id,
            csrfToken,
            ctxId: 'reports-list',
            reportType: type,
          })
        }

        return [
          { html: `<p class="govuk-body-s">${reportName}</p>` },
          { html: createListItemProductMin(name, <ReportType>type) },
          { html: ShowMoreUtils.createShowMoreHtml(desc) },
          {
            html: `<a class='dpr-user-list-action govuk-link--no-visited-state govuk-!-margin-bottom-1' href="${href}">Request ${type}</a>
            ${bookmarkHtml}`,
          },
        ]
      }),
    )

    const head = [
      { text: 'Product', classes: 'dpr-product-head' },
      { text: 'Name', classes: 'dpr-name-head' },
      { text: 'Description', classes: 'dpr-description-head' },
      // { text: 'Type', classes: 'dpr-type-head' },
      { text: 'Actions', classes: 'dpr-bookmark-head' },
    ]

    return {
      head,
      rows,
    }
  },
}
