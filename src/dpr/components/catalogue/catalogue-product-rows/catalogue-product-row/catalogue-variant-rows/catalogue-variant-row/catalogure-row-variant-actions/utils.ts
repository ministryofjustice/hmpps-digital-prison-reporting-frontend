import { Response, Request } from 'express'
import { setupSubscriptionConfig } from 'src/dpr/components/subscription/utils'
import { VariantDefinitionSummaryWithSchedule } from 'src/dpr/types/Subscriptions'
import { LoadType, ReportType } from '../../../../../../../types/UserReports'
import localsHelper, { getRouteLocals } from '../../../../../../../utils/localsHelper'
import { setNestedPath } from '../../../../../../../utils/urlHelper'
import { components } from '../../../../../../../types/api'
import {
  CatalogueVariantRowActionBookmark,
  CatalogueVariantRowActionRequestLoad,
  CatalogueVariantRowActions,
  CatalogueVariantRowActionSubscription,
} from './types'
import { setUpBookmark } from '../../../../../../bookmark/utils'
import { Services } from '../../../../../../../types/Services'

/**
 * Initialises the actions for a row
 *
 * @param {Response} res
 * @param {Request} req
 * @param {Services} services
 * @param {string} productId
 * @param {(components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'])} variant
 * @param {ReportType} reportType
 * @param {boolean} authorised
 * @return {*}  {Promise<CatalogueVariantRowActions>}
 */
export const intitialiseCatalogueRowActions = async (
  res: Response,
  req: Request,
  services: Services,
  definition: components['schemas']['ReportDefinitionSummary'],
  variant:
    | components['schemas']['VariantDefinitionSummary']
    | components['schemas']['DashboardDefinitionSummary']
    | VariantDefinitionSummaryWithSchedule,
  reportType: ReportType,
  authorised: boolean,
): Promise<CatalogueVariantRowActions> => {
  if (!authorised) {
    return {
      authorised,
    }
  }

  let missing
  if (reportType === ReportType.REPORT) {
    missing = setMissingAction(res, definition.id, <components['schemas']['VariantDefinitionSummary']>variant)
  }

  let request
  let bookmark
  let subscription
  if (!missing) {
    request = setRequestAction(res, definition.id, variant, reportType)

    if (services.bookmarkService.enabled) {
      bookmark = await setBookmark(res, req, services, definition.id, variant.id, reportType)
    }

    // TODO: Subs: remove this casting when API is ready
    if (services.subscriptionService.enabled && (<VariantDefinitionSummaryWithSchedule>variant).schedule) {
      subscription = await setSubscriptionAction(
        res,
        req,
        services,
        definition,
        <VariantDefinitionSummaryWithSchedule>variant,
      )
    }
  }

  return {
    missing,
    request,
    authorised,
    bookmark,
    subscription,
  }
}

/**
 * Sets the request action href and label
 *
 * @param {Response} res
 * @param {string} productId
 * @param {(components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'])} variant
 * @param {ReportType} reportType
 * @return {*}  {CatalogueVariantRowActionRequestLoad}
 */
const setRequestAction = (
  res: Response,
  productId: string,
  variant: components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'],
  reportType: ReportType,
): CatalogueVariantRowActionRequestLoad => {
  const href = setRequestHref(res, productId, variant, reportType)

  const label = variant.loadType === 'sync' ? `Load ${reportType}` : `Request ${reportType}`

  return {
    href,
    label,
  }
}

/**
 * Sets the request href
 *
 * @param {Response} res
 * @param {string} productId
 * @param {(components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'])} variant
 * @param {ReportType} reportType
 * @return {*}
 */
const setRequestHref = (
  res: Response,
  productId: string,
  variant: components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'],
  reportType: ReportType,
) => {
  const { nestedBaseUrl } = getRouteLocals(res)
  const rootPath = setNestedPath(`/dpr`, nestedBaseUrl)

  const { id, loadType } = variant

  const syncPath = `${rootPath}/view-report/sync/${reportType}/${productId}/${id}/load-report`
  const asyncPath = `${rootPath}/request-report/${reportType}/${productId}/${id}/filters`

  return loadType && loadType === LoadType.SYNC ? syncPath : asyncPath
}

/**
 * Sets the missing action href and label
 *
 * @param {Response} res
 * @param {string} productId
 * @param {components['schemas']['VariantDefinitionSummary']} variant
 * @return {*}  {(CatalogueVariantRowActionRequestLoad | undefined)}
 */
const setMissingAction = (
  res: Response,
  productId: string,
  variant: components['schemas']['VariantDefinitionSummary'],
): CatalogueVariantRowActionRequestLoad | undefined => {
  const { nestedBaseUrl } = getRouteLocals(res)
  const rootPath = setNestedPath(`/dpr`, nestedBaseUrl)
  const { isMissing, id } = variant

  let href
  if (isMissing) {
    href = `${rootPath}/request-missing-report/${productId}/${id}/form`

    return {
      href,
      label: 'Request report',
    }
  }

  return undefined
}

/**
 * Set bookmark action
 *
 * @param {Response} res
 * @param {Request} req
 * @param {Services} services
 * @param {string} productId
 * @param {string} id
 * @param {ReportType} reportType
 * @return {*}  {Promise<CatalogueVariantRowActionBookmark>}
 */
const setBookmark = async (
  res: Response,
  req: Request,
  services: Services,
  productId: string,
  id: string,
  reportType: ReportType,
): Promise<CatalogueVariantRowActionBookmark> => {
  const { csrfToken, dprUser } = localsHelper.getValues(res)

  const reportIsBookmarked = await services.bookmarkService.isBookmarked(id, productId, dprUser.id)

  const bookmarkConfig = setUpBookmark(res, req, services.bookmarkService, reportIsBookmarked)

  return {
    reportId: productId,
    id,
    reportType,
    csrfToken,
    ...bookmarkConfig,
  }
}

const setSubscriptionAction = async (
  res: Response,
  req: Request,
  services: Services,
  definition: components['schemas']['ReportDefinitionSummary'],
  variant: VariantDefinitionSummaryWithSchedule,
): Promise<CatalogueVariantRowActionSubscription> => {
  const subscriptionConfig = await setupSubscriptionConfig(
    req,
    res,
    definition.id,
    variant.id,
    variant.schedule,
    services,
  )

  const reportConfig = {
    reportId: definition.id,
    id: variant.id,
    name: variant.name,
    description: variant.description ?? definition.description ?? '',
    reportName: definition.name,
    type: ReportType.REPORT,
  }

  return {
    subscriptionConfig,
    reportConfig,
  }
}
