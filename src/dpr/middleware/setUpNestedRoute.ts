import { RequestHandler } from 'express'
import { setNestedPath } from '../utils/urlHelper'
import logger from '../utils/logger'

export const setupNestedRoute = (): RequestHandler => {
  return (req, res, next) => {
    const locals = res.app.locals.dprPaths

    // Initialise originals once
    if (!locals.original) {
      locals.original = { ...locals }
    }

    const base = req.baseUrl && req.baseUrl.length > 0 ? req.baseUrl : undefined
    const { original } = locals

    // CASE 1: no baseUrl so reset to originals
    if (!base) {
      locals.nestedBaseUrl = undefined
      Object.assign(locals, original)
      return next()
    }

    // CASE 2: baseUrl is the SAME as last time so skip
    if (locals.nestedBaseUrl === base) {
      return next()
    }

    logger.info(
      'Running nested-route middleware',
      JSON.stringify(
        {
          routerBase: req.baseUrl,
          mountPoint: req.originalUrl,
        },
        null,
        2,
      ),
    )

    // CASE 3: baseUrl is NEW so apply nested version
    locals.nestedBaseUrl = base

    locals.bookmarkActionEndpoint = setNestedPath(original.bookmarkActionEndpoint, base)
    locals.downloadActionEndpoint = setNestedPath(original.downloadActionEndpoint, base)
    locals.productCollectionEndpoint = setNestedPath(original.productCollectionEndpoint, base)
    locals.bookmarkListPath = setNestedPath(original.bookmarkListPath, base)
    locals.requestedListPath = setNestedPath(original.requestedListPath, base)
    locals.recentlyViewedListPath = setNestedPath(original.recentlyViewedListPath, base)
    locals.reportsCatalogue = setNestedPath(original.reportsCatalogue, base)
    locals.userReportsList = setNestedPath(original.userReportsList, base)
    locals.dprHomepage = setNestedPath(original.dprHomepage, base)

    return next()
  }
}

export default setupNestedRoute
