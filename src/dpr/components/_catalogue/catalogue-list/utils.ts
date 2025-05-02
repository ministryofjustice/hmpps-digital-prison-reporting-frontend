import { Response } from 'express'
import { components } from '../../../types/api'
import { Services } from '../../../types/Services'
import { DashboardDefinition } from '../../_dashboards/dashboard/types'
import { DefinitionData, LoadType, ReportType } from '../../../types/UserReports'
import ShowMoreUtils from '../../show-more/utils'
import { createListItemProductMin, createListActions, setInitialHref } from '../../../utils/reportListsHelper'
import { CatalogueFeatures } from '../catalogue/types'
import LocalsHelper from '../../../utils/localsHelper'

export default {
  getReportsList: async (
    res: Response,
    services: Services,
    features: CatalogueFeatures,
  ): Promise<{ head: { text: string }[]; rows: { text?: string; html?: string }[] }> => {
    const { definitions, csrfToken, bookmarkingEnabled, userId } = LocalsHelper.getValues(res)

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
      (
        def: components['schemas']['ReportDefinitionSummary'] & {
          dashboards: DashboardDefinition[]
          authorised: boolean
        },
      ) => {
        const { id: reportId, name: reportName, description: reportDescription } = def
        const { variants } = def
        const { dashboards } = def
        const { authorised } = def

        const variantsArray = variants.map((variant: components['schemas']['VariantDefinitionSummary']) => {
          const { id, name, description } = variant

          // NOTE: loadType added to VariantDefinitionSummary mocked data to dictate the load/request journey. Not present in API response. To discuss
          const { loadType } = <components['schemas']['VariantDefinitionSummary'] & { loadType: LoadType }>variant

          return {
            reportName,
            reportId,
            id,
            name,
            description,
            type: ReportType.REPORT,
            loadType,
            authorised,
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
              authorised,
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
        const { id, name, description, reportName, reportId, reportDescription, type, loadType, authorised } = v
        const desc = description || reportDescription

        const href = setInitialHref(loadType, type, reportId, id, res)

        let bookmarkHtml
        const showBookMarkToggle =
          features?.bookmarkingEnabled !== undefined ? features?.bookmarkingEnabled : bookmarkingEnabled

        if (showBookMarkToggle) {
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
          { html: createListActions(href, type, loadType, bookmarkHtml, authorised) },
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
