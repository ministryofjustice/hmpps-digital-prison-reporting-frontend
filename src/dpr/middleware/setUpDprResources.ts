/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler, Response, Request } from 'express'
import type { ParsedQs } from 'qs'
import { Services } from '../types/Services'
import { RequestedReport, StoredReportData } from '../types/UserReports'
import DefinitionUtils from '../utils/definitionUtils'
import { BookmarkStoreData } from '../types/Bookmark'
import { DprConfig } from '../types/DprConfig'
import localsHelper from '../utils/localsHelper'
import logger from '../utils/logger'

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
    res.locals.validationErrors = JSON.parse(errors[0])
  }
}

export const populateDefinitions = async (services: Services, req: Request, res: Response, config?: DprConfig) => {
  // Get the DPD path from the query
  const { token } = localsHelper.getValues(res)

  const dpdPathFromQuery = deriveDefinitionsPath(req.query)
  const dpdPathFromBody = req.body?.dataProductDefinitionsPath
  const definitionsPathFromQuery = dpdPathFromQuery || dpdPathFromBody

  if (definitionsPathFromQuery) {
    res.locals.dpdPathFromQuery = true
  }

  // Get the DPD path from the config
  const dpdPathFromConfig = config?.dataProductDefinitionsPath
  if (dpdPathFromConfig) {
    res.locals.dpdPathFromConfig = true
  }

  // query takes presedence over config
  res.locals.definitionsPath = definitionsPathFromQuery || dpdPathFromConfig
  res.locals.pathSuffix = `?dataProductDefinitionsPath=${res.locals.definitionsPath}`

  if (token && services.reportingService) {
    res.locals.definitions = await services.reportingService.getDefinitions(token, res.locals.definitionsPath)
  }
}

export const populateRequestedReports = async (services: Services, res: Response) => {
  const { dprUser } = localsHelper.getValues(res)
  if (dprUser.id) {
    const { definitions, definitionsPath } = res.locals

    logger.info(`Getting requested reports for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`)
    const requested = await services.requestedReportService.getAllReports(dprUser.id)
    res.locals.requestedReports = !definitionsPath
      ? requested
      : requested.filter((report: RequestedReport) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    logger.info(`Getting recently viewed reports for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`)
    const recent = await services.recentlyViewedService.getAllReports(dprUser.id)
    res.locals.recentlyViewedReports = !definitionsPath
      ? recent
      : recent.filter((report: StoredReportData) => {
          return DefinitionUtils.getCurrentVariantDefinition(definitions, report.reportId, report.id)
        })

    if (services.bookmarkService) {
      res.locals.bookmarkingEnabled = true

      logger.info(`Getting bookmarks for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`)
      const bookmarks = await services.bookmarkService.getAllBookmarks(dprUser.id)
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
