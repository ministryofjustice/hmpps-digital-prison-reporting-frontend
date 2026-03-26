import { RequestHandler } from 'express'
import { setNestedPath } from '../utils/urlHelper'
import logger from '../utils/logger'

export const setupNestedRoute = (): RequestHandler => {
  return (req, res, next) => {
    logger.info('Initialising nested route')

    const locals = res.app.locals.dprPaths
    const base = req.baseUrl && req.baseUrl.length > 0 ? req.baseUrl : undefined

    if (base) {
      locals.nestedBaseUrl ??= base
      locals.bookmarkActionEndpoint = setNestedPath(locals.bookmarkActionEndpoint, base)
      locals.downloadActionEndpoint = setNestedPath(locals.downloadActionEndpoint, base)
      locals.productCollectionEndpoint = setNestedPath(locals.productCollectionEndpoint, base)
      locals.bookmarkListPath = setNestedPath(locals.bookmarkListPath, base)
      locals.requestedListPath = setNestedPath(locals.requestedListPath, base)
      locals.recentlyViewedListPath = setNestedPath(locals.recentlyViewedListPath, base)
      locals.reportsCatalogue = setNestedPath(locals.reportsCatalogue, base)
      locals.userReportsList = setNestedPath(locals.userReportsList, base)
      locals.dprHomepage = setNestedPath(locals.dprHomepage, base)
    }

    console.log({ locals })

    next()
  }
}

export default setupNestedRoute
