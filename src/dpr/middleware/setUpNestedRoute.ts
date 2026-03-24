import { RequestHandler } from 'express'
import { setNestedPath } from '../utils/urlHelper'

export const setupNestedRoute = (): RequestHandler => {
  return async (req, res, next) => {
    if (req.baseUrl && req.baseUrl.length) {
      res.locals['nestedBaseUrl'] = req.baseUrl
    }

    // Bookmark endpoint
    if (!res.locals['bookmarkActionEndoint']) {
      const bookmarkPath = `/dpr/my-reports/bookmarks`
      res.locals['bookmarkActionEndoint'] = setNestedPath(bookmarkPath, res.locals['nestedBaseUrl'])
    }

    // Download endpoint
    if (!res.locals['downloadActionEndpoint']) {
      const downloadPath = '/dpr/download-report/'
      res.locals['downloadActionEndpoint'] = setNestedPath(downloadPath, res.locals['nestedBaseUrl'])
    }

    next()
  }
}

export default setupNestedRoute
