/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Response, Request } from 'express'
import type { ParsedQs } from 'qs'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import DefinitionUtils from '../utils/definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'
import { DprConfig } from '../types/DprConfig'
import localsHelper from '../utils/localsHelper'

const getQueryParamAsString = (query: ParsedQs, name: string) => (query[name] ? query[name].toString() : null)
const getDefinitionsPath = (query: ParsedQs) => getQueryParamAsString(query, 'dataProductDefinitionsPath')

const deriveDefinitionsPath = (query: ParsedQs): string | null => {
  const definitionsPath = getDefinitionsPath(query)
  if (definitionsPath) {
    return definitionsPath
  }

  return null
}

export const setupResources = (services: Services, config?: DprConfig): RequestHandler => {
  return async (req, res, next) => {
    populateValidationErrors(req, res)
    try {
      await populateDefinitions(services, req, res, config)
      await populateRequestedReports(services, res)
      return next()
    } catch (error) {
      return next(error)
    }
  }
}

const populateValidationErrors = (req: Request, res: Response) => {
  const errors = req.flash(`DPR_ERRORS`)
  if (errors && errors[0]) {
    res.locals['validationErrors'] = JSON.parse(errors[0])
  }
}

export const populateDefinitions = async (services: Services, req: Request, res: Response, config?: DprConfig) => {
  // Get the DPD path from the query
  const { token, dprUser } = localsHelper.getValues(res)

  const dpdPathFromQuery = deriveDefinitionsPath(req.query)
  const dpdPathFromBody = req.body?.dataProductDefinitionsPath
  const definitionsPathFromQuery = dpdPathFromQuery || dpdPathFromBody

  if (definitionsPathFromQuery) {
    res.locals['dpdPathFromQuery'] = true
  }

  // Get the DPD path from the config
  const dpdPathFromConfig = config?.dataProductDefinitionsPath
  if (dpdPathFromConfig) {
    res.locals['dpdPathFromConfig'] = true
  }

  // query takes presedence over config
  res.locals['definitionsPath'] = definitionsPathFromQuery || dpdPathFromConfig
  res.locals['pathSuffix'] = `?dataProductDefinitionsPath=${res.locals['definitionsPath']}`

  if (token && services.productCollectionStoreService.enabled) {
    const selectedProductCollectionId = await services.productCollectionStoreService.getSelectedProductCollectionId(
      dprUser.id,
    )

    res.locals['definitions'] =
      (await Promise.all([
        services.reportingService.getDefinitions(token, res.locals['definitionsPath']),
        selectedProductCollectionId &&
          services.productCollectionService.getProductCollection(token, selectedProductCollectionId),
      ]).then(([defs, selectedProductCollection]) => {
        if (selectedProductCollection && selectedProductCollection) {
          const productIds = selectedProductCollection.products.map((product) => product.productId)
          return defs.filter((def) => productIds.includes(def.id))
        }
        return defs
      })) ?? []
  }
}

export const populateRequestedReports = async (services: Services, res: Response) => {
  const { dprUser } = localsHelper.getValues(res)
  if (dprUser.id) {
    const { definitions, definitionsPath } = res.locals

    const requested = await services.requestedReportService.getAllReports(dprUser.id)
    res.locals['requestedReports'] = !definitionsPath
      ? requested
      : requested.filter((report: RequestedReport) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    const recent = await services.recentlyViewedService.getAllReports(dprUser.id)
    res.locals['recentlyViewedReports'] = !definitionsPath
      ? recent
      : recent.filter((report: StoredReportData) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    res.locals['downloadingEnabled'] = services.downloadPermissionService.enabled
    res.locals['bookmarkingEnabled'] = services.bookmarkService.enabled
    res.locals['collectionsEnabled'] = services.productCollectionService.enabled
    res.locals['requestMissingEnabled'] = services.missingReportService.enabled
    res.locals['saveDefaultsEnabled'] = services.defaultFilterValuesService.enabled

    if (res.locals['bookmarkingEnabled']) {
      const bookmarks = await services.bookmarkService.getAllBookmarks(dprUser.id)
      res.locals['bookmarks'] = !definitionsPath
        ? bookmarks
        : bookmarks.filter((bookmark: BookmarkStoreData) => {
            return DefinitionUtils.getCurrentVariantDefinition(definitions, bookmark.reportId, bookmark.id)
          })
    }
  }
}

export default setupResources
