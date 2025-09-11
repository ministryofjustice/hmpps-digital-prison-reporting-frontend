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
    features?: CatalogueFeatures,
  ): Promise<{ head: { text: string }[]; rows: { text?: string; html?: string }[]; id: string }> => {
    const { definitions, csrfToken, bookmarkingEnabled, dprUser } = LocalsHelper.getValues(res)

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
        const { id: reportId, name: reportName, description: reportDescription, variants, dashboards, authorised } = def

        const variantsArray: DefinitionData[] = variants.map(
          (variant: components['schemas']['VariantDefinitionSummary']) => {
            const { id, name, description, isMissing } = variant

            // NOTE: loadType added to VariantDefinitionSummary mocked data to dictate the load/request journey. Not present in API response. To discuss
            const loadType = variant.loadType || LoadType.ASYNC

            return {
              reportName,
              reportId,
              id,
              name,
              description,
              type: ReportType.REPORT,
              loadType,
              authorised,
              isMissing,
              ...(reportDescription && reportDescription.length && { reportDescription }),
            }
          },
        )

        let dashboardsArray: DefinitionData[] = []
        if (dashboards) {
          dashboardsArray = dashboards.map((dashboard: DashboardDefinition) => {
            const { id, name, description, isMissing } = dashboard
            return {
              reportName,
              reportId,
              id,
              name,
              description,
              type: ReportType.DASHBOARD,
              reportDescription,
              authorised,
              isMissing,
              loadType: LoadType.ASYNC,
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
        const {
          id,
          name,
          description,
          reportName,
          reportId,
          reportDescription,
          type,
          loadType,
          authorised,
          isMissing,
        } = v
        const desc = description || reportDescription || ''

        const href = setInitialHref(loadType, type, reportId, id, res, isMissing)

        let bookmarkHtml
        const showBookMarkToggle =
          features?.bookmarkingEnabled !== undefined ? features?.bookmarkingEnabled : bookmarkingEnabled

        if (showBookMarkToggle) {
          bookmarkHtml = await services.bookmarkService.createBookMarkToggleHtml({
            userId: dprUser.id,
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
          { html: createListActions(href, type, loadType, bookmarkHtml, authorised, isMissing) },
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
      id: 'dpr-reports-catalogue',
    }
  },
}
