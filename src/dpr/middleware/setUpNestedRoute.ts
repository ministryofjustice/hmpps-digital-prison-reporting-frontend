import { RequestHandler } from 'express'
import { setNestedPath } from '../utils/urlHelper'

export const setupNestedRoute = (): RequestHandler => {
  return async (req, res, next) => {
    if (req.baseUrl && req.baseUrl.length && !res.app.locals['nestedBaseUrl']) {
      res.app.locals['nestedBaseUrl'] = req.baseUrl
    }

    // Bookmark endpoint
    if (!res.app.locals['bookmarkActionEndoint']) {
      const bookmarkPath = `/dpr/my-reports/bookmarks`
      res.app.locals['bookmarkActionEndoint'] = setNestedPath(bookmarkPath, res.locals['nestedBaseUrl'])
    }

    // Download endpoint
    if (!res.app.locals['downloadActionEndpoint']) {
      const downloadPath = '/dpr/download-report/'
      res.locals['downloadActionEndpoint'] = setNestedPath(downloadPath, res.locals['nestedBaseUrl'])
    }

    // Product collection endpoint
    if (!res.app.locals['productCollectionEndpoint']) {
      const collectionPath = '/dpr/product-collection/selected'
      res.app.locals['productCollectionEndpoint'] = setNestedPath(collectionPath, res.locals['nestedBaseUrl'])
    }

    // Bookmarks list path
    if (!res.app.locals['bookmarkListPath']) {
      const bookmarkListPath = '/dpr/my-reports/bookmarks/list'
      res.app.locals['bookmarkListPath'] = setNestedPath(bookmarkListPath, res.locals['nestedBaseUrl'])
    }

    // Requested list path
    if (!res.app.locals['requestedListPath']) {
      const requestedListPath = '/dpr/my-reports/requested-reports/list'
      res.app.locals['requestedListPath'] = setNestedPath(requestedListPath, res.locals['nestedBaseUrl'])
    }

    // Viewed list path
    if (!res.app.locals['recentlyViewedListPath']) {
      const recentlyViewedListPath = '/dpr/my-reports/recently-viewed/list'
      res.app.locals['recentlyViewedListPath'] = setNestedPath(recentlyViewedListPath, res.locals['nestedBaseUrl'])
    }

    next()
  }
}

export default setupNestedRoute
