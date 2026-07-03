import { Response, Request } from 'express'
import { components } from '../../../types/api'
import { Services } from '../../../types/Services'
import { DefinitionData, LoadType, ReportType } from '../../../types/UserReports'
import ShowMoreUtils from '../../show-more/utils'
import { createListItemProductMin, createListActions, setInitialHref } from '../../../utils/reportListsHelper'
import LocalsHelper from '../../../utils/localsHelper'
import { renderSubscriptionToggleAsHtml } from '../../subscription/subscription-toggle/utils'

export const getReportsList = async (
  res: Response,
  req: Request,
  services: Services,
): Promise<{ head: { text: string }[]; rows: { text?: string; html?: string }[][]; id: string }> => {
  const { definitions, csrfToken, bookmarkingEnabled, subscriptionsEnabled, dprUser } = LocalsHelper.getValues(res)

  // Sort report Definitions by product name
  const sortedDefinitions = definitions.sort(
    (a: components['schemas']['ReportDefinitionSummary'], b: components['schemas']['ReportDefinitionSummary']) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    },
  )

  // Sort by variant/dashboard name
  const sortedVariants = sortedDefinitions.flatMap((def: components['schemas']['ReportDefinitionSummary']) => {
    const { id: reportId, name: reportName, description: reportDescription, variants, dashboards, authorised } = def

    const productBase = {
      reportName,
      reportId,
      authorised,
      reportDescription: reportDescription || '',
    }

    let variantsArray: DefinitionData[] = []
    if (variants) {
      variantsArray = variants.map((variant: components['schemas']['VariantDefinitionSummary']) => {
        const { id, name, description, isMissing, loadType, schedule } = variant

        return {
          ...productBase,
          type: ReportType.REPORT,
          loadType: <LoadType>loadType || LoadType.ASYNC,
          id,
          name,
          description: description || '',
          isMissing,
          schedule,
        }
      })
    }

    let dashboardsArray: DefinitionData[] = []
    if (dashboards) {
      dashboardsArray = dashboards.map((dashboard: components['schemas']['DashboardDefinitionSummary']) => {
        const { id, name, description, loadType } = dashboard

        return {
          ...productBase,
          type: ReportType.DASHBOARD,
          loadType: <LoadType>loadType || LoadType.ASYNC,
          id,
          name,
          description: description || '',
          isMissing: false,
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
  })

  const userConfig = await services.bookmarkService.getState(dprUser.id)
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
        schedule,
      } = v
      const desc = description || reportDescription || ''

      const href = setInitialHref(loadType, type, reportId, id, res, isMissing)
      const { bookmarkActionEndpoint } = LocalsHelper.getRouteLocals(res)

      let bookmarkHtml
      if (bookmarkingEnabled) {
        bookmarkHtml = await services.bookmarkService.createBookMarkButtonHtml({
          userConfig,
          reportId,
          id,
          csrfToken,
          ctxId: 'reports-list',
          reportType: type,
          isMissing: Boolean(isMissing),
          endpoint: bookmarkActionEndpoint,
        })
      }

      let subsHtml
      if (subscriptionsEnabled && schedule) {
        subsHtml = await renderSubscriptionToggleAsHtml(
          req,
          res,
          schedule,
          {
            reportId,
            id,
            name,
            reportName,
            description: desc,
            type,
          },
          services,
        )
      }

      return [
        { html: `<p class="govuk-body-s">${reportName}</p>` },
        { html: createListItemProductMin(name, <ReportType>type, schedule) },
        { html: ShowMoreUtils.createShowMoreHtml(desc) },
        { html: createListActions(href, type, loadType, bookmarkHtml, subsHtml, authorised, isMissing) },
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
}

export default {
  getReportsList,
}
