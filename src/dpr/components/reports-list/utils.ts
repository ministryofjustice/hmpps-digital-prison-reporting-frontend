import { Response } from 'express'
import { components } from '../../types/api'
import { Services } from '../../types/Services'
import { createShowMoreHtml, createTag } from '../../utils/reportsListHelper'
import { DashboardDefinition } from '../../types/Dashboards'
import { ReportType } from '../../types/UserReports'

interface definitionData {
  reportName: string
  reportId: string
  id: string
  name: string
  description: string
  type: 'report' | 'dashboard'
  reportDescription: string
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
            const { id, name, description } = dashboard
            return {
              reportName,
              reportId,
              id,
              name,
              description,
              type: ReportType.DASHBOARD,
              reportDescription,
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
        const { id, name, description, reportName, reportId, reportDescription, type } = v
        const desc = description || reportDescription

        let hrefHtml
        let bookmarkColumn
        let listType
        switch (type) {
          case 'report':
            hrefHtml = `<a href='/async-reports/${reportId}/${id}/request${pathSuffix}'>${name}</a>`
            bookmarkColumn = {
              html: await services.bookmarkService.createBookMarkToggleHtml(
                userId,
                reportId,
                id,
                csrfToken,
                'reports-list',
              ),
              attributes: {
                tabindex: 0,
              },
            }
            listType = createTag(type)
            break
          case 'dashboard':
            hrefHtml = `<a href='/dashboards/${reportId}/load/${id}${pathSuffix}'>${name}</a>`
            bookmarkColumn = {}
            listType = createTag(type)
            break
          default:
            hrefHtml = ''
            bookmarkColumn = {}
            break
        }

        return [
          { text: reportName },
          { html: hrefHtml },
          { html: createShowMoreHtml(desc) },
          { html: listType },
          {
            ...bookmarkColumn,
          },
        ]
      }),
    )

    const head = [
      { text: 'Product', classes: 'dpr-product-head' },
      { text: 'Name', classes: 'dpr-name-head' },
      { text: 'Description', classes: 'dpr-description-head' },
      { text: 'Type', classes: 'dpr-type-head' },
      { text: 'Bookmark', classes: 'dpr-bookmark-head' },
    ]

    return {
      head,
      rows,
    }
  },
}
