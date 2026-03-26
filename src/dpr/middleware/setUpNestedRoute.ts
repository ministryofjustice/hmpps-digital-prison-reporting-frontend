import { RequestHandler } from 'express'
import { setNestedPath } from '../utils/urlHelper'

export const setupNestedRoute = (): RequestHandler => {
  return (req, res, next) => {
    const locals = (res.app.locals.dpr ??= {})

    const currentBase = req.baseUrl && req.baseUrl.length > 0 ? req.baseUrl : undefined

    if (locals.nestedBaseUrl !== currentBase) {
      locals.nestedBaseUrl = currentBase

      // Reset cached paths so they can be remade
      locals.bookmarkActionEndpoint = undefined
      locals.downloadActionEndpoint = undefined
      locals.productCollectionEndpoint = undefined
      locals.bookmarkListPath = undefined
      locals.requestedListPath = undefined
      locals.recentlyViewedListPath = undefined
    }
    const base = locals.nestedBaseUrl

    locals.bookmarkActionEndpoint ??= setNestedPath('/dpr/my-reports/bookmarks', base)
    locals.downloadActionEndpoint ??= setNestedPath('/dpr/download-report/', base)
    locals.productCollectionEndpoint ??= setNestedPath('/dpr/product-collection/selected', base)
    locals.bookmarkListPath ??= setNestedPath('/dpr/my-reports/bookmarks/list', base)
    locals.requestedListPath ??= setNestedPath('/dpr/my-reports/requested-reports/list', base)
    locals.recentlyViewedListPath ??= setNestedPath('/dpr/my-reports/recently-viewed/list', base)

    next()
  }
}

export default setupNestedRoute
