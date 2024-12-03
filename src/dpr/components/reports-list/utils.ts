import { Response } from 'express'
import { components } from '../../types/api'
import { Services } from '../../types/Services'
import { DashboardDefinition } from '../../types/Dashboards'
import { LoadType, ReportType } from '../../types/UserReports'
import ShowMoreUtils from '../show-more/utils'
import { createListItemProductMin, createListActions } from '../../utils/reportListsHelper'

interface DefinitionData {
  reportName: string
  reportId: string
  id: string
  name: string
  description: string
  type: 'report' | 'dashboard'
  reportDescription: string
  loadType?: LoadType
}

const setInitialHref = (loadType: LoadType, definitionData: DefinitionData, pathSuffix: string) => {
  const { type, reportId, id } = definitionData
  let href = `/async/${type}/${reportId}/${id}/request${pathSuffix}`

  // NOTE: this is possibly the same for SCHEDULED reports too?
  if (loadType && loadType === LoadType.SYNC) {
    href = `/sync/${type}/${reportId}/${id}/load-report${pathSuffix}`
  }

  return href
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
      (def: components['schemas']['ReportDefinitionSummary'] & { dashboards: DashboardDefinition[] }) => {
        const { id: reportId, name: reportName, description: reportDescription } = def
        const { variants } = def
        const { dashboards } = def

        const variantsArray = variants.map((variant: components['schemas']['VariantDefinitionSummary']) => {
          const { id, name, description } = variant

          // NOTE: possible solution to add loadType to VariantDefinitionSummary to dictate the load/request journey.
          const { loadType } = <components['schemas']['VariantDefinitionSummary'] & { loadType: LoadType }>variant

          return {
            reportName,
            reportId,
            id,
            name,
            description,
            type: ReportType.REPORT,
            loadType,
            ...(reportDescription && reportDescription.length && { reportDescription }),
          }
        })

        let dashboardsArray: DefinitionData[] = []
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

        mergedArray.sort((a: DefinitionData, b: DefinitionData) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        })

        return mergedArray
      },
    )

    const rows = await Promise.all(
      sortedVariants.map(async (v: DefinitionData) => {
        const { id, name, description, reportName, reportId, reportDescription, type, loadType } = v
        const desc = description || reportDescription

        const href = setInitialHref(loadType, v, pathSuffix)
        const bookmarkHtml = await services.bookmarkService.createBookMarkToggleHtml({
          userId,
          reportId,
          id,
          csrfToken,
          ctxId: 'reports-list',
          reportType: type,
        })

        return [
          { html: `<p class="govuk-body-s">${reportName}</p>` },
          { html: createListItemProductMin(name, <ReportType>type) },
          { html: ShowMoreUtils.createShowMoreHtml(desc) },
          { html: createListActions(href, type, loadType, bookmarkHtml) },
        ]
      }),
    )

    const head = [
      { text: 'Product', classes: 'dpr-product-head' },
      { text: 'Name', classes: 'dpr-name-head' },
      { text: 'Description', classes: 'dpr-description-head' },
      { text: 'Actions', classes: 'dpr-bookmark-head' },
    ]

    return {
      head,
      rows,
    }
  },
}
