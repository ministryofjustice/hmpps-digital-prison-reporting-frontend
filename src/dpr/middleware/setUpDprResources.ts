/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Response, Request } from 'express'
import type { ParsedQs } from 'qs'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import DefinitionUtils from '../utils/definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'
import { getRoutePrefix } from '../utils/urlHelper'
import { DprConfig } from '../types/DprConfig'

const getQueryParamAsString = (query: ParsedQs, name: string) => (query[name] ? query[name].toString() : null)
const getDefinitionsPath = (query: ParsedQs) => getQueryParamAsString(query, 'dataProductDefinitionsPath')

const deriveDefinitionsPath = (query: ParsedQs): string | null => {
  const definitionsPath = getDefinitionsPath(query)
  if (definitionsPath) {
    return definitionsPath
  }

  return null
}

export default (services: Services, config?: DprConfig): RequestHandler => {
  return async (req, res, next) => {
    try {
      await populateDefinitions(services, req, res, config)
      await populateRequestedReports(services, res)
      setRoutePrefix(res, config)
      return next()
    } catch (error) {
      return next(error)
    }
  }
}

export const setRoutePrefix = async (res: Response, config?: DprConfig) => {
  res.locals.routePrefix = getRoutePrefix(config)
}

export const populateDefinitions = async (services: Services, req: Request, res: Response, config?: any) => {
  // Get the DPD path from the query
  const dpdPathFromQuery = deriveDefinitionsPath(req.query)
  const dpdPathFromBody = req.body.dataProductDefinitionsPath
  const definitionsPathFromQuery = dpdPathFromQuery || dpdPathFromBody

  if (definitionsPathFromQuery) {
    res.locals.dpdPathFromQuery = true
  }

  // Get the DPD path from the config
  const dpdPathFromConfig = config?.dprDataProductDefinitionPath
  if (dpdPathFromConfig) {
    res.locals.dpdPathFromConfig = true
  }

  // query takes presedence over config
  res.locals.definitionsPath = definitionsPathFromQuery || dpdPathFromConfig
  res.locals.pathSuffix = `?dataProductDefinitionsPath=${res.locals.definitionsPath}`

  if (res.locals.user.token && services.reportingService) {
    res.locals.definitions = await services.reportingService.getDefinitions(
      res.locals.user.token,
      res.locals.definitionsPath,
    )
  }
}

export const populateRequestedReports = async (services: Services, res: Response) => {
  if (res.locals.user) {
    const { uuid: userId } = res.locals.user
    const { definitions, definitionsPath } = res.locals

    const requested = await services.requestedReportService.getAllReports(userId)
    res.locals.requestedReports = !definitionsPath
      ? requested
      : requested.filter((report: RequestedReport) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    const recent = await services.recentlyViewedService.getAllReports(userId)
    res.locals.recentlyViewedReports = !definitionsPath
      ? recent
      : recent.filter((report: StoredReportData) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    if (services.bookmarkService) {
      res.locals.bookmarkingEnabled = true

      const bookmarks = await services.bookmarkService.getAllBookmarks(userId)
      res.locals.bookmarks = !definitionsPath
        ? bookmarks
        : bookmarks.filter((bookmark: BookmarkStoreData) => {
            return DefinitionUtils.getCurrentVariantDefinition(definitions, bookmark.reportId, bookmark.id)
          })
    }

    if (services.downloadPermissionService) {
      res.locals.downloadingEnabled = true
    }
  }
}
