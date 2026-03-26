import { RequestHandler } from 'express'
import { setNestedPath } from '../utils/urlHelper'

export const setupNestedRoute = (): RequestHandler => {
  return async (req, res, next) => {
    const currentBase = req.baseUrl && req.baseUrl.length > 0 ? req.baseUrl : undefined
    const storedBase = res.app.locals['nestedBaseUrl']

    // Allow for mulitple nested routes
    if (currentBase !== storedBase) {
      res.app.locals['nestedBaseUrl'] = currentBase

      // Reset derived endpoints so they are recomputed
      res.app.locals['bookmarkActionEndoint'] = undefined
      res.app.locals['downloadActionEndpoint'] = undefined
      res.app.locals['productCollectionEndpoint'] = undefined
      res.app.locals['bookmarkListPath'] = undefined
      res.app.locals['requestedListPath'] = undefined
      res.app.locals['recentlyViewedListPath'] = undefined
    }

    const nestedBase = res.app.locals['nestedBaseUrl']

    // Bookmark endpoint
    if (!res.app.locals['bookmarkActionEndoint']) {
      const bookmarkPath = `/dpr/my-reports/bookmarks`
      res.app.locals['bookmarkActionEndoint'] = setNestedPath(bookmarkPath, nestedBase)
    }

    // Download endpoint
    if (!res.app.locals['downloadActionEndpoint']) {
      const downloadPath = '/dpr/download-report/'
      res.app.locals['downloadActionEndpoint'] = setNestedPath(downloadPath, nestedBase)
    }

    // Product collection endpoint
    if (!res.app.locals['productCollectionEndpoint']) {
      const collectionPath = '/dpr/product-collection/selected'
      res.app.locals['productCollectionEndpoint'] = setNestedPath(collectionPath, nestedBase)
    }

    // Bookmarks list path
    if (!res.app.locals['bookmarkListPath']) {
      const bookmarkListPath = '/dpr/my-reports/bookmarks/list'
      res.app.locals['bookmarkListPath'] = setNestedPath(bookmarkListPath, nestedBase)
    }

    // Requested list path
    if (!res.app.locals['requestedListPath']) {
      const requestedListPath = '/dpr/my-reports/requested-reports/list'
      res.app.locals['requestedListPath'] = setNestedPath(requestedListPath, nestedBase)
    }

    // Viewed list path
    if (!res.app.locals['recentlyViewedListPath']) {
      const recentlyViewedListPath = '/dpr/my-reports/recently-viewed/list'
      res.app.locals['recentlyViewedListPath'] = setNestedPath(recentlyViewedListPath, nestedBase)
    }

    next()
  }
}

export default setupNestedRoute
