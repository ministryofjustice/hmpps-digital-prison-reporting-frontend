import { Response, Request } from 'express'
import { LoadType, ReportType } from '../../../../../../../types/UserReports'
import localsHelper, { getRouteLocals } from '../../../../../../../utils/localsHelper'
import { setNestedPath } from '../../../../../../../utils/urlHelper'
import { components } from '../../../../../../../types/api'
import {
  CatalogueVariantRowActionBookmark,
  CatalogueVariantRowActionRequestLoad,
  CatalogueVariantRowActions,
} from './types'
import { setUpBookmark } from '../../../../../../bookmark/utils'
import { Services } from '../../../../../../../types/Services'

export const intitialiseCatalogueActions = async (
  res: Response,
  req: Request,
  services: Services,
  productId: string,
  variant: components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'],
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
    missing = setMissingAction(res, productId, <components['schemas']['VariantDefinitionSummary']>variant)
  }

  let request
  let bookmark
  if (!missing) {
    request = setRequestAction(res, productId, variant, reportType)

    if (services.bookmarkService.enabled) {
      bookmark = await setBookmark(res, req, services, productId, variant.id, reportType)
    }
  }

  return {
    missing,
    request,
    authorised,
    bookmark,
  }
}

const setRequestAction = (
  res: Response,
  productId: string,
  variant: components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'],
  reportType: ReportType,
): CatalogueVariantRowActionRequestLoad => {
  const href = setHref(res, productId, variant, reportType)

  const label = variant.loadType === 'sync' ? `Load ${reportType}` : `Request ${reportType}`

  return {
    href,
    label,
  }
}

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

const setHref = (
  res: Response,
  productId: string,
  variant: components['schemas']['VariantDefinitionSummary'] | components['schemas']['DashboardDefinitionSummary'],
  reportType: ReportType,
) => {
  const { pathSuffix, dpdPathFromQuery } = localsHelper.getValues(res)
  const { nestedBaseUrl } = getRouteLocals(res)
  const rootPath = setNestedPath(`/dpr`, nestedBaseUrl)

  const { id, loadType } = variant

  const dpdPathQueryParam = dpdPathFromQuery ? pathSuffix : ''

  const syncPath = `${rootPath}/view-report/sync/${reportType}/${productId}/${id}/load-report${dpdPathQueryParam}`
  const asyncPath = `${rootPath}/request-report/${reportType}/${productId}/${id}/filters${dpdPathQueryParam}`

  return loadType && loadType === LoadType.SYNC ? syncPath : asyncPath
}

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
